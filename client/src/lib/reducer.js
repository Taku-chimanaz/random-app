export const reducer = (state, action) => {

   const newPost = action.payload || [];
   console.log(newPost)
   
   if(action.type === "POST"){
 
      if(newPost.length === 0){
          return []
      }else {
         return [...state, newPost]
      }
 
   }else if(action.type === "first time"){
      return [...newPost]
   }
 
 }