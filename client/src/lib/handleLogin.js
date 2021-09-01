import {apiUrl} from './data';

export const HandleLoginForm = (e, loginInputs, setUser, loggedIn, setLogIn, myLoading, updateModal) => {

    e.preventDefault();
    myLoading();

    const loginDetails = JSON.stringify(loginInputs);

    if(loginInputs.username && loginInputs.password){

       
        fetch(`${apiUrl}/api/users/login/${loginDetails}`, {method: "POST"})
        .then(res => res.json())
        .then(result =>{
                
            if(result !== "Wrong password or username.Try again"){
                setUser(result);
                setLogIn(!loggedIn);
            }else {
                updateModal(result)
            }

        })
        .catch(err => console.log(err))
    }else {
        console.log("Enter all inputs please")
    }
}