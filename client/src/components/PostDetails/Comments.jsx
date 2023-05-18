import React, { useState, useRef } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/posts";

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const commentScrollRef = useRef(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleAddComment = async () => {
    const response = await dispatch(
      addComment(`${user?.user?.name}: ${comment}`, post?._id)
    );
    setComments(response);
    setComment("");
    commentScrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="comments-container">
      <div className="comments-view">
        <Typography gutterBottom variant="h5">
          Comments
        </Typography>
        {comments.length > 0 ? (
          comments.map((com, index) => (
            <Typography variant="subtitle1" key={index}>
              <strong>{com.split(": ")[0]}:</strong>
              {com.split(":")[1]}
              
            </Typography>
          ))
        ) : (
          <Typography>No comments yet</Typography>
        )}
        <div ref={commentScrollRef} />
      </div>
      {user?.user?.name && (
        <div className="add-comments">
          <Typography variant="h5" gutterBottom>
            Add Comment
          </Typography>
          <TextField
            name="comment"
            label="Comment"
            placeholder="Share Your Thoughts"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            fullWidth
            rows={4}
            multiline
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "black",
              marginBottom: 2,
              "&:hover": {
                backgroundColor: "#393646",
              },
            }}
            onClick={handleAddComment}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comments;
