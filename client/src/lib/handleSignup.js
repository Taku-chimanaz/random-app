import {apiUrl} from './data';

export const handleSignup = (e, inputs, showModal) => {

    
    e.preventDefault();

    const userDetails = JSON.stringify({...inputs});

    if(inputs.fullname && inputs.username && inputs.password){
        
        fetch(`${apiUrl}/api/users/${userDetails}`, {method: "POST"})
        .then(res => res.json())
        .then(result => showModal(result))
        .catch(() => showModal("Could not send request.Try again"))


    }else {
        console.log("Provide all the requirements you idiot!!")
    }
}