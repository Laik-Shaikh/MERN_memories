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
