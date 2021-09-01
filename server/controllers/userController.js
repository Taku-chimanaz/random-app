const User = require("../models/User");


const returnUser = (req, res) => {

    const userID = JSON.parse(req.params.id);

    User.findById(userID)
    .then(user =>{
        res.json({name: user.fullname, handle: user.username})
    })
    .catch(err => console.log(err))
}


const createUser = (req, res) => {
    const id = JSON.parse(req.params.id);
    const {fullname, username, password} = id;

    
    new User({fullname, username, password}).save()
        .then(() => res.json(`User was successful created`))
        .catch(err => {
            console.log(err)
            res.status(400).json(`There was an error in creating your accout.Try again`);
        }
    )
}

const deleteUser = (req, res)=>{
    const id = JSON.parse(req.params.id);

    User.findByIdAndDelete({id})
        .then(() => res.json(`Users was successfully deleted`))
        .catch(err  => res.status(400).json(`Error: ${err}`))
}


const updateUser = (req, res) => {
    const {id, fullname} = req.params.id;

    User.findByIdAndUpdate({id, fullname})
        .then(() => res.json("User successfully updated"))
        .catch(err => res.status(400).json("Error" + err))
}


const handleLogin = (req, res) => {

    const loginDetails = JSON.parse(req.params.id);

    User.find()
    .then(users => {

        const isUserAvailable = users.find(user => user.password === loginDetails.password && user.username === loginDetails.username);

        if(isUserAvailable){

            const user = {
                bio: isUserAvailable.bio,
                id: isUserAvailable.id,
                username: isUserAvailable.username,
                fullname: isUserAvailable.fullname,
                followers: isUserAvailable.followers,
                following: isUserAvailable.following,
                posts: isUserAvailable.posts,  
            }

            res.json(user)

        }else {
            res.json("Wrong password or username.Try again")
        }
    })
    .catch(err => console.log(err))
}

const returnUnfollowedUsers = (req, res)=> {
    const userID = JSON.parse(req.params.id);
    
    //Getting user from db
    User.findById(userID, (err, user)=>{

        if(err){
            return res.status(505).json("Something went wrong")
        }else {
            
            // Getting followers array from the returned user

            const following = user.following;
            
            // Gettinng users not yet followed by the User

            User.find((err, users)=> {

                if(err){
                    res.status(505).json("Something went wrong");
                }else {
                    
                    
                    // creating an array of user not yet followed

                    const unfollowedList = [];

                    users.forEach(user => {
                        const index = following.indexOf(`${user._id}`)
                    
                        
                        if(index === -1 && user._id != userID){
                            unfollowedList.push({id: user.id, fullname: user.fullname, username: user.username});
                        }
                            
                        }
                    )
                    
                    // Returning list to the client
                    res.json(unfollowedList)
                }
            })

        }
    })

}

const follow = (req, res) => {
    const usersIDs = JSON.parse(req.params.id);
    const {accountToBeFollowedID, accountOwnerID} = usersIDs;
    
    // Finding user in the db

    User.findById(accountOwnerID, (err, user)=>{

        if(err){
            console.log(err)
        }else {
            
            // updating the user's following array  in db

            User.findByIdAndUpdate(accountOwnerID, {following: [...user.following,accountToBeFollowedID]}, {useFindAndModify: false})
            .then(() =>{
                
                 // Updating the followers of the account followed
                // And returning json of the new account followed

                User.findByIdAndUpdate(accountToBeFollowedID, {followers: [...user.followers, accountOwnerID]}, {useFindAndModify: false})
                .then(() => res.json([...user.following, accountToBeFollowedID]))
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        
    })


    

}

const returnFollowedUsers = (req, res) => {

    const userID = JSON.parse(req.params.id);


    User.findById(userID)
    .then(async (result) =>{

        const followedUsers = result.following;
        
        //  Getting followed user's details

        User.find()
        .then(users => {

            const followedUsersDetails = [];

            users.forEach(user => {
                
                const index = followedUsers.indexOf(`${user._id}`);

                if(index !== -1){
                    followedUsersDetails.push({id: user._id, fullname: user.fullname, username: user.username})
                }
            })

            res.json(followedUsersDetails)
        })



        
    })
    .catch(err => console.log(err))
}

const unfollow = (req, res)=> {

    const IDs = JSON.parse(req.params.id);
    const {accountToBeUnfollowedID, accountOwnerID} = IDs;

    User.findById(accountOwnerID)
    .then(user => {

        const followedUsers = user.following;
        newFollowing = followedUsers.filter(id => id !== accountToBeUnfollowedID);

        // Updating the following array in db for the account unfollowing another user

        User.findByIdAndUpdate(accountOwnerID, {following: newFollowing})
        .then(() => {

            // Updating the followers array for the account that was unfollowed
            User.findById(accountToBeUnfollowedID)
            .then(user => {

                const accountToBeUnfollowedFollowers = user.followers;
                const newFollowers = accountToBeUnfollowedFollowers.filter(id => id !== accountOwnerID);  // removing accountOwnerID

                
                User.findByIdAndUpdate(accountToBeUnfollowedID, {followers: [...newFollowers]}, {useFindAndModify: false})
                .then(() => res.json(newFollowing))
                .catch(err => console.log(err))

            })
            


        })
        .catch(err => res.json(err))    
    })
    

    
}

const returnFollowers = (req, res)=> {

    const userID = JSON.parse(req.params.id)

    // Finding user in the db
    User.findById(userID)
    .then(user => {
    
        const followers = user.followers;
        const followersDetails = [];

        // Getting followers of user and pushing them to the followersDetails array

        User.find()
        .then(users => {

            users.forEach(user => {

                const index = followers.indexOf(`${user._id}`);

                if(index !== -1){
                    followersDetails.push({id: user._id, fullname: user.fullname, username: user.username})
                }
            })

            res.json(followersDetails)
        })
    })
}

const removeFollower = (req, res)=> {
    const IDs = JSON.parse(req.params.id);
    const {accountToBeRemovedID, accountOwnerID} = IDs;

    User.findById(accountOwnerID)
    .then(user => {

        const followers = user.followers;
        const newFollowers = followers.filter(id => id !== accountToBeRemovedID);

        // Updating followers array
        User.findByIdAndUpdate(accountOwnerID, {followers: [...newFollowers]})
        .then(() => {
            
            // Updating the following array for the removed follower
            User.findById(accountToBeRemovedID)
            .then(user => {

                const followings = user.following;
                const newFollowing = followings.filter(id => id !== accountOwnerID);

                User.findByIdAndUpdate(accountToBeRemovedID, {following: [...newFollowing]})
                .then(() => res.json(newFollowers))
                .catch(err => console.log(err))
            })
        })
    })
    .catch(err => console.log(err))
}


module.exports = {
    createUser,
    deleteUser,
    updateUser,
    handleLogin,
    returnUser,
    returnUnfollowedUsers,
    follow,
    returnFollowedUsers,
    unfollow,
    returnFollowers,
    removeFollower
}