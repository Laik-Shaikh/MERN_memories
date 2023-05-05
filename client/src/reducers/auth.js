export default (user = { authData: null }, action) => {
    switch (action.type) {
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...user, authData: action?.data }

        case "LOGOUT":
            localStorage.removeItem('profile');
        default:
            return user;
    }
} 