const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, updatePost, likePost } = require('../controllers/posts');

router.get('/', getAllPosts);
router.post('/createPost', createPost);
router.patch('/updatePost/:id', updatePost);
router.put('/likePost/:id', likePost);

module.exports = router;