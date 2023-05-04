import React, { useState } from "react";
import "../../../Styles/common.styles.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";

const Post = ({ post, setCurrentId }) => {


  return (
    <>
      <Card className="card">
        <CardMedia
          className="postImage"
          image={post.image}
          title={post.title}
        />
        <div className="overlay">
          <Typography variant="h6">{post.creator}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="overlay2">
          <Button style={{ color: "white" }} onClick={() => setCurrentId(post._id)} size="small">
            <MoreHorizIcon fontSize="small" />
          </Button>
        </div>
        <div className="details">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography variant='h5' className="title" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color='textSecondary' gutterBottom>
            {post.message.length > 150 ? `${post.message.substr(0, 150)}...` : post.message}
          </Typography>
        </CardContent>
        <CardActions className="cardAction">
          <Button size="small" color="primary">
            <ThumbUpAlt fontSize={"small"} />
            &nbsp; Like &nbsp;
            {post.likes}
          </Button>
          <Button size="small" color="primary">
            <DeleteIcon fontSize={"small"} />
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
