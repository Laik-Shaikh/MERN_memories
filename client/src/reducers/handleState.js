export default (showSignInCard = false, action) => {
    switch (action.type) {
        case "SignInCard":
            return !showSignInCard;
        default:
            return showSignInCard;
    }
}