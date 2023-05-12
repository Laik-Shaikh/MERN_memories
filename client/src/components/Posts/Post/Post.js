import React, { useState } from "react";
import "../../../Styles/common.styles.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const openPost = () => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.user?.sub || user?.user?._id)
      ) ? (
        <>
          <ThumbUpAlt fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <>
      <Card className="card" raised elevation={6}>
        <CardMedia
          className="postImage"
          image={post.image}
          title={post.title}
          sx={{ cursor: "pointer" }}
          onClick={() => openPost()}
        />
        <div
          style={{ cursor: "pointer" }}
          className="overlay"
          onClick={() => openPost()}
        >
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.user?._id === post.creator ||
          user?.user?.sub === post.creator) && (
          <div className="overlay2">
            <Button
              style={{ color: "white" }}
              onClick={() => setCurrentId(post._id)}
              size="small"
              sx={{ top: -15, right: -30 }}
            >
              <MoreHorizIcon fontSize="small" />
            </Button>
          </div>
        )}
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant="h5" className="title" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.message.length > 120
              ? `${post.message.substr(0, 120)}...`
              : post.message}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px 8px 16px",
          }}
        >
          <Button
            onClick={() => dispatch(likePost(post._id))}
            size="small"
            color="primary"
            disabled={!user?.user}
          >
            <Likes />
          </Button>
          {(user?.user?._id === post.creator ||
            user?.user?.sub === post.creator) && (
            <Button
              onClick={() => dispatch(deletePost(post._id))}
              size="small"
              color="primary"
            >
              <DeleteIcon fontSize={"small"} />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
