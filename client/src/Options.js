import React, {useState} from 'react';
import Discover from './Discover';
import Following from './Following'
import Followers from './Followers';
import { handleClick } from './lib/handleClick';

const Options = React.memo(({user, posts, setUser}) => {
    
    const [displayDiscover, setDiscover] = useState(false)
    const [displayFollowing, setFollowing] = useState(false)
    const [displayFollowers,setFollowers] = useState(false)


    return (

        <>
            {displayDiscover && <Discover user={user} setUser={setUser} setDiscover={setDiscover}/>}
            {displayFollowing && <Following user={user} setUser={setUser} setFollowing={setFollowing}/>}
            {displayFollowers && <Followers user={user} setUser={setUser} setFollowers={setFollowers}/>}
            <div className="section-links">
                <button onClick={(e) => handleClick(e, setDiscover, setFollowing, setFollowers)}>Followers  <span>{user.followers.length}</span></button>
                <button onClick={(e) => handleClick(e, setDiscover, setFollowing, setFollowers)}>Following  <span>{user.following.length}</span></button>
                <button>best posts</button>
                <button>Total Posts <span>{posts.length}</span></button>
                <button href="#" onClick={(e) => handleClick(e,setDiscover,setFollowing,setFollowers)}>Discover</button>
            </div>
            <div className="user-details">
                <p className="name">{user.fullname}</p>
                <p className="handler">@{user.username}</p>
            </div>
        </>
    )
})

export default Options