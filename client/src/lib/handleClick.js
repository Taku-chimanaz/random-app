export const handleClick = (e, setDiscover, setFollowing, setFollowers) => {
    const targetButton = e.target.innerHTML.slice(0,9);
    const postsFeeds = document.querySelector(".posts");
    postsFeeds.classList.add("hide-posts");

    switch(targetButton){
        
        case "Discover":
            setDiscover(true);
            break;
        case "Followers":
            setFollowers(true)
            break;
        case "Following":
            setFollowing(true)
            break;
        default:
            break;
        
    }
    
}

export const showPostFeeds =  () => {
    const postsFeeds = document.querySelector(".posts");
    postsFeeds.classList.remove("hide-posts");
}
