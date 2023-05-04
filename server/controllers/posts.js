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
  const { title, message, image, creator, tags } = req.body;
  try {
    const newPost = new PostMessage({ title, message, image, creator, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  // id: _id  => renaming id to _id.
  const { id: _id } = req.params;
  const { title, message, image, creator, tags } = req.body;

  if (!mongoose.isValidObjectId(_id))
    return res.status(404).json({ error: "No Post is found by this Id." });

  try {
    const updatePost = { title, message, image, creator, tags, _id };
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, updatePost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
