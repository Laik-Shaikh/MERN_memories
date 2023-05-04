const express = require('express');
const router = express.Router();

const { getAllPosts, createPost, updatePost } = require('../controllers/posts');

router.get('/', getAllPosts);
router.post('/createPost', createPost);
router.patch('/updatePost/:id', updatePost);

module.exports = router;