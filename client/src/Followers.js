import {useEffect, useState} from 'react'
import {showPostFeeds, showPostFollowers} from './lib/handleClick';
import {apiUrl} from './lib/data'

const Followers = ({user, setUser, setFollowers}) => {

    const [accounts, setAccounts] = useState([])
    const userID = JSON.stringify(user.id);

    useEffect(() => {
        fetch(`${apiUrl}/api/users/followers/${userID}`)
        .then(res => res.json())
        .then(result => setAccounts(result))
        .catch(err => console.log("Req not made"))
    }, [user]);


    const removeFollower = (accountToBeRemovedID) => {
        const accountOwnerID = user.id
        const IDs = JSON.stringify({accountToBeRemovedID, accountOwnerID});

        fetch(`${apiUrl}/api/users/remove-follower/${IDs}`, {method: "POST"})
        .then(res => res.json())
        .then(result => {
            setUser({...user, followers: [...result]})
        })
        .catch(err => console.log(err))
    }


    return(
        
        <section className="discover">
            
            <div className="accounts">
                <button className="close-discover" onClick={() =>{
                    showPostFeeds();
                    setFollowers(false)
                }}>&times;</button>
                {accounts.length === 0 ? <h4>No account is following you!</h4>:

                    accounts.map(account => {
                        return <Account key={account.id} account={account} removeFollower={removeFollower}/>
                    })

                }
            </div>

        </section>
    )
}


const Account = ({account, removeFollower}) => {
    return(

        <>
            <article className="account">
                <div className="profile"></div>
                <div className="profile-details">
                    <h4>{account.fullname}</h4>
                    <h4>@{account.username}</h4>
                </div>
                <button onClick={() => removeFollower(account.id)}>Remove</button>
            </article>
        </>
    )
}

export default Followers;