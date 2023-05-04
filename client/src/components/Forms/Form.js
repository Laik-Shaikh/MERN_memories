import React, { useEffect, useState } from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import FileBase from "react-file-base64";
import { styles } from "../../Styles/Styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((post) => post._id === currentId));

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
    dispatch(createPost(postData));
    }
    handleClear();
  };

  const handleClear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      image: "",
    });
  };

  return (
    <Paper
      sx={{
        padding: 2,
      }}
      className="paper"
    >
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography sx={styles.mb} variant="h6" textAlign={"center"}>
          {currentId ? 'Editing' : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          sx={styles.mb}
          value={postData.creator}
          required
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          sx={styles.mb}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          sx={styles.mb}
          fullWidth
          minRows={4}
          multiline
          required
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          sx={styles.mb}
          label="Tags"
          fullWidth
          required
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className="fileInput mb-10">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, image: base64 })
            }
          />
        </div>
        <Button
          className="btn-submit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={styles.mb}
          fullWidth
        >
          {currentId ? "Update" : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClear}
          fullWidth
          sx={{ backgroundColor: "red" }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
