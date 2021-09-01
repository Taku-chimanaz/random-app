export const changeStatValue = (e, alreadyClicks, setAlreadClicked, setStats) => {

    const value = e.target.innerHTML;
    const likes = value.search("Likes");
    const retweets = value.search("Retweet");
    const comments = value.search("Comments");
    console.log(value, likes, retweets, comments)
    
    if(likes === 0){
        
        if(!alreadyClicks.like){

            setAlreadClicked({...alreadyClicks, like: !alreadyClicks.like})
            setStats((prevPostStats)=>{
                return {...prevPostStats, likes: prevPostStats.likes + 1};
            })

        }else{

            setAlreadClicked({...alreadyClicks, like: !alreadyClicks.like})
            setStats((prevPostStats)=>{
                return {...prevPostStats, likes: prevPostStats.likes - 1};
            })

        }
       
    }else if(retweets === 0){

        if(!alreadyClicks.retweet){

            setAlreadClicked({...alreadyClicks, retweet: !alreadyClicks.retweet})
            setStats((prevPostStats)=>{
                return {...prevPostStats, retweets: prevPostStats.retweets + 1};
             })
        }else {
            setAlreadClicked({...alreadyClicks, retweet: !alreadyClicks.retweet})
            setStats((prevPostStats)=>{
                return {...prevPostStats, retweets: prevPostStats.retweets - 1};
            })
        }

    }else if(comments === 0){
       
        if(!alreadyClicks.comment){

            setAlreadClicked({...alreadyClicks, comment: !alreadyClicks.comment})
            setStats((prevPostStats)=>{
                return {...prevPostStats, comments: prevPostStats.comments + 1};
            })
        }else {
            setAlreadClicked({...alreadyClicks, comment: !alreadyClicks.comment})
            setStats((prevPostStats)=>{
                return {...prevPostStats, comments: prevPostStats.comments - 1};
            })
        }
    }
    
}