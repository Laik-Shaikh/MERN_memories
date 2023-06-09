import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

// interceptor for middleware at backend;
// or adding the headers to axios request to backend;
// more specific adding jwt token to req headers.

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPost = (page) => API.get(`/api/posts?page=${page}`);

export const getSinglePost = (id) => API.get(`/api/posts/getPostById/${id}`);

export const getPostsBySearch = (searchQuery) =>
  API.get(
    `/api/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const createPost = (newPost) =>
  API.post(`/api/posts/createPost`, newPost);

export const updatePost = (id, updatePost) =>
  API.patch(`/api/posts/updatePost/${id}`, updatePost);

export const likePost = (id) => API.put(`/api/posts/likePost/${id}`);

export const addComment = (comment, id) => API.put(`/api/posts/addComment/${id}`, {comment});

export const deletePost = (id) => API.delete(`/api/posts//deletePost/${id}`);

// Auth API
export const signUp = (FormData) => API.post(`/api/user/signup`, FormData);
export const signIn = (FormData) => API.post(`/api/user/signin`, FormData);
