import axios from "axios";

const url = "http://localhost:5000";

export const createPost = (newPost) =>
  axios.post(`${url}/api/posts/createPost`, newPost);

export const fetchPost = () => axios.get(`${url}/api/posts`);
