import React, { useEffect } from "react";
import "../../Styles/postDetails.styles.css";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getPostsBySearch, getSinglePost } from "../../actions/posts";
import Comments from "./Comments";

const PostDetail = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  useEffect(() => {
    dispatch(
      getPostsBySearch({ searchQuery: "none", tags: post?.tags.join(",") })
    );
  }, [post]);

  console.log(post);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const openPost = (id) => navigate(`/posts/${id}`);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className="card1">
        <div className="section">
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          {/* <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} /> */}
          <Typography variant="body1">
            <Comments post={post}/>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="imageSection">
          <img
            className="media"
            src={
              post.image ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length > 0 && (
        <div className="section">
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(
              ({ title, name, message, likes, image, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    <strong>{title}</strong>
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message.length > 120 ? `${message.substr(0, 120)}...` : message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: <strong>{likes.length}</strong>
                  </Typography>
                  <img src={image} style={{ objectFit:"contain", width:"200px", height:"200px" }}  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetail;
