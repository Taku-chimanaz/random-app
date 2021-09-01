import {useEffect, useState} from 'react';
import { showPostFeeds } from './lib/handleClick';
import {apiUrl} from './lib/data'


const Following = ({user, setUser, setFollowing}) => {

    const [followedAccounts, setAccounts] = useState([]);

    // Fetching Details for the followed accounts

    useEffect(() => {
        const userID = JSON.stringify(user.id)
        
        fetch(`${apiUrl}/api/users/following/${userID}`)
        .then(res => res.json())
        .then(result => setAccounts(result))
        .catch(err => console.log(err));
    }, [user])


    // fUNCTION TO UNFOLLOW A USER
    
    const unfollow = (accountToBeUnfollowedID) => {

        const IDs = JSON.stringify({accountToBeUnfollowedID, accountOwnerID: user.id});
        
        fetch(`${apiUrl}/api/users/unfollow/${IDs}`, {method: "POST"})
        .then(result => result.json())
        .then(res => setUser({...user, following: [...res]}))
        .catch(err => console.log("Request failed"))
    }


    return (

        <section className="discover">
            
            <div className="accounts">
                <button className="close-discover" onClick={() =>{
                    showPostFeeds();
                    setFollowing(false)
                }}>&times;</button>

                {followedAccounts.length === 0 ? <h4>No accounts followed yet!</h4>:

                    followedAccounts.map(account => {
                        return <Account key={account.id} account={account} unfollow={unfollow}/>
                    })

                }
            </div>

        </section>
    )
}


const Account = ({account, unfollow}) => {
    return(

        <>
            <article className="account">
                <div className="profile"></div>
                <div className="profile-details">
                    <h4>{account.fullname}</h4>
                    <h4>@{account.username}</h4>
                </div>
                <button onClick={()=> unfollow(account.id)}>Unfollow</button>
            </article>
        </>
    )
}

export default Following;