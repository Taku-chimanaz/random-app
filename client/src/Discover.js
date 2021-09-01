import {useEffect, useState} from 'react';
import {showPostFeeds} from './lib/handleClick';
import {apiUrl} from './lib/data'

const Discover = ({user, setDiscover, setUser }) => {

    const [accounts, setAccounts] = useState([]);
    const userID = JSON.stringify(user.id)

    // Getting unfollowed users from db

    useEffect(() => {
        fetch(`${apiUrl}/api/users/unfollowed/${userID}`, {method: "GET"})
        .then(res => res.json())
        .then(result => setAccounts(result))
        .catch(err => console.log(err))
    },[userID])

    // Function to follow a user

    const follow = (ids) => {
        const usersIDs = JSON.stringify(ids);

        // Sending a req to update following array in db

        fetch(`${apiUrl}/api/users/follow/${usersIDs}`, {method: "POST"})
        .then(res => res.json())
        .then(result => {
            // update following array in the frontend
            setUser({...user, following: [...result]});

            // update the users not yet followed 

            const newAccounts = accounts.filter(account => account.id !== ids.accountToBeFollowedID);
            setAccounts(newAccounts)

        })
        .catch(err => console.log(err))


    }



    //  returning all accounts not yet followed by user
    return (

        <section className="discover">
            
            <div className="accounts">
                <button className="close-discover" onClick={() =>{
                    showPostFeeds();
                    setDiscover(false)
                }}>&times;</button>
                { accounts.length === 0 ? <h4>No accounts are available!</h4>:
                    accounts.map(account => {
                        return <Account key={account.id} account={account} follow={follow} followID = {user.id}/>
                    })
                }
            </div>

        </section>
    )
}


const Account = ({account, follow, followID}) => {
    return(

        <>
            <article className="account">
                <div className="profile"></div>
                <div className="profile-details">
                    <h4>{account.fullname}</h4>
                    <h4>@{account.username}</h4>
                </div>
                <button onClick={() => follow({accountToBeFollowedID: account.id, accountOwnerID: followID})}>Follow</button>
            </article>
        </>
    )
}

export default Discover;