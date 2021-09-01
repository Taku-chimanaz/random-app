import {useState, useReducer, useEffect} from 'react';
import Navbar from './Navbar'
import {messagesNum, notificationsNum, availableInterests, apiUrl} from './lib/data';
import Options from './Options';
import Posts from './Posts';
import Interests from './Interests';
import Modal from './Modal'
import {reducer} from './lib/reducer'
import Forms from './Login';

function App() {

   const [user, setUser] = useState({});
   const [loggedIn, setLogIn] = useState(false);
   const [posts, dispatch] = useReducer(reducer, []);
   const [postContentValue, setContentValue] = useState("");
   const [displayModal, setModal] = useState(false);
   const [postsFromFollowing, setPostsFollowing] = useState([]);

   useEffect(()=> {
      if(user.fullname === undefined){
         document.title = "Random App";
      }else {
         document.title = user.fullname;
      }
   }, [user]);

   // getting posts from accounts the user follow

   useEffect(()=>{
      const userFollowing = JSON.stringify(user.following);
   
      if(user.fullname === undefined){
         return;
      }else {

         fetch(`${apiUrl}/api/posts/following-posts/${userFollowing}`)
         .then(res => res.json())
         .then(posts => setPostsFollowing(posts))
         .catch(err => console.log(err))
      }

   },[user])




   const handleOnChange = (e) => {
      let newContentValue = e.target.value;
      setContentValue(newContentValue);
   }

   const postContent = (e) => {

      e.preventDefault();

      if(postContentValue === ''){
         setModal(true);

         setTimeout(()=>{
            setModal(false)
         },2000)

      }else {

         const post = JSON.stringify({
            owner: user.id,
            postContentValue
         });

         fetch(`${apiUrl}/api/posts/create/${post}`, {method: "POST"})
         .then(res => res.json())
         .then(result => {

            const newPost = result;
            dispatch({type: "POST", payload: newPost})
         })
         .catch(err => console.log(err))
      }

      setContentValue("")
   }

  
   if(loggedIn){

      return (

         <>
     
           <Navbar messages={messagesNum} notifications={notificationsNum} setLogIn={setLogIn} />
     
           {displayModal && <Modal/>}
     
     
           <div className="feeds">

              <section className="options">
                 <Options user={user} setUser={setUser} posts={posts}/>
              </section>
     
              <section className="posts">
                 <Posts posts={posts} postContentValue={postContentValue} handleOnChange={handleOnChange} postContent={postContent}
                 user={user} setUser={setUser} postsFromFollowing={postsFromFollowing} dispatch={dispatch}/>
              </section>
     
              <section className="interests">
                 <h4>Click On An Interest To Add To Your Collection.</h4>
                 <Interests availableInterests = {availableInterests}/>
              </section>
     
           </div>
         </>
       )
   }else {
      
      return <Forms setUser={setUser} loggedIn={loggedIn} setLogIn={setLogIn} dispatch={dispatch}/>
   }

   
}


export default App;
