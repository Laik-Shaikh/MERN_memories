const mongoose = require("mongoose");
const PostMessage = require("../models/postMessage");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, message, image, tags, name } = req.body;
  try {
    const newPost = new PostMessage({ title, message, name, image, creator: req.userId, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  // id: _id  => renaming id to _id.
  const { id: _id } = req.params;
  const { title, message, image, tags } = req.body;

  if (!mongoose.isValidObjectId(_id))
    return res.status(404).json({ error: "No Post is found by this Id." });

  try {
    const updatePost = { title, message, image, tags, _id };
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, updatePost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!req.userId) return res.status(403).json({ message: "Unauthorized" });
  try {
    if (!mongoose.isValidObjectId(_id))
      return res.status(404).json({ message: "No Posts Found" });
    const post = await PostMessage.findById(_id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      // like post
      post.likes.push(req.userId);
    } else {
      // dislike
      post.likes = post.likes.filter((id) => id !== req.userId);
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.isValidObjectId(_id))
      return res.status(404).json({ error: "Post Doesn't Exists" });

    const deletePost = await PostMessage.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
