import React, { useState } from "react";
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);

  return (
    <>
      {
        !posts.length ? <CircularProgress /> : (
          <Grid className="grid-container" container alignItems={"stretch"} spacing={3}>
            {
              posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={6}>
                  <Post setCurrentId={setCurrentId} post={post} />
                </Grid>
              ))
            }
          </Grid>
        )
      }
    </>
  );
}

export default Posts;