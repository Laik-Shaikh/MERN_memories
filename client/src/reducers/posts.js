// posts => state

export default (posts = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            console.log("action", action.payload);
            return action.payload;
        case "CREATE":
            console.log("prev: ", posts);
            console.log("again: ", action.payload);
            const data = action.payload
            return  [ ...posts, data ] ;
        default:
            return posts;
    }
}