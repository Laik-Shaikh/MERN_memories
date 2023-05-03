import React, { useState } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);

  return (
    <>
      <div>
        Posts
      </div>
    </>
  );
}

export default Posts;