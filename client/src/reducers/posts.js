// posts => state

export default (posts = { isLoading: false, posts: [] }, action) => {
    switch (action.type) {
        case "START_LOADING":
            return { ...posts, isLoading: true };
        case "END_LOADING":
            return { ...posts, isLoading: false };
        case "FETCH_ALL":
            return { ...posts, posts: action.payload?.posts, currentPage: action.payload?.currentPage, totalPages: action.payload?.totalPages };
        case "GET_POST":
            return { ...posts, post: action.payload }
        case "FETCH_BY_SEARCH":
            return { ...posts, posts: action.payload };
        case "CREATE":
            return  { ...posts, posts: [ ...posts.posts, action.payload ] };
        case "UPDATE":
            return { ...posts, posts: posts.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case "LIKE":
            return { ...posts, posts: posts.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case "DELETE":
            return { ...posts, posts: posts.posts.filter((post) => post._id !== action.payload) };
        default:
            return posts;
    }
}