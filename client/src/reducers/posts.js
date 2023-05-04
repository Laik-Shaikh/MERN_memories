// posts => state

export default (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            const data = action.payload
            return  [ ...posts, data ];
        case "UPDATE":
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }
}