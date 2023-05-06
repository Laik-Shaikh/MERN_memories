const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  updatePost,
  likePost,
  deletePost,
} = require("../controllers/posts");
const { authorizeUser } = require("../middleware/authorization");

router.get("/", getAllPosts);
router.post("/createPost", authorizeUser, createPost);
router.patch("/updatePost/:id", authorizeUser, updatePost);
router.put("/likePost/:id", authorizeUser, likePost);
router.delete("/deletePost/:id", authorizeUser, deletePost);

module.exports = router;
