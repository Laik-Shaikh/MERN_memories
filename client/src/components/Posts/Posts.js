import React, { useState } from "react";
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    console.log(posts);

    if(!isLoading && !posts.length) {
      return (
        <div className="noPostContainer">
          <img className="noPostLogo" src="/images/no-results.png" alt="No Post Found" />
          <Typography variant="h3" color="black" >OOPS!! No Post Found</Typography>
        </div>
      )
    }

  return (
    <>
      {
        isLoading ? (
          <div style={{ display:"flex", justifyContent: "center", alignItems: "center", height: "50%" }}>
             <CircularProgress sx={{color: "black"}}  />
          </div>
        ) : (
          <Grid className="grid-container" container alignItems={"stretch"} spacing={3}>
            {
              posts.map((post) => (
                <Grid item key={post._id} xs={12} sm={6} md={6} lg={4}>
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