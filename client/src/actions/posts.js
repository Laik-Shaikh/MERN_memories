import * as api from "../api/api";

// action creators:  actions are the function that returns a function(redux thunk) in case of asynchronous api call.
// action creator must have two property => 1. type and 2. payload

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: "FETCH_ALL", payload: data.posts });
  } catch (error) {
    console.log(error);
  }
  // const action = { type: "FETCH_ALL", payload: [] };
};

export const createPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.createPost(newPost);
        dispatch({ type: "CREATE", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, updatePost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatePost);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
    // to get more information about the error
    // use only console.log(error) instead of console.log(error.message)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log(id);
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.message);
  }
}
