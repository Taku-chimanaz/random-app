import {useState} from 'react';
import {handleSignup} from './lib/handleSignup';
import {HandleLoginForm} from './lib/handleLogin';
import Modal from './Modal';
import {defaultAuth} from './lib/data'

const Forms = ({setUser, loggedIn, setLogIn, dispatch}) => {

    const [loading, setLoading] = useState(false);
    const [showLoginForm, setShowForm] = useState(true);
    const [inputs, setInputs] = useState({fullname: "", username: "", password: ""});
    const [loginInputs, setloginInputs] = useState({username: "", password: ""});
    const [displayModal, setModal] = useState({display: false, content: ""});

    // Displaying the signup form

    const showSignupForm = (e) => {
        e.preventDefault();
        setShowForm(!showLoginForm)
    }

    // Displaying the loginform

    const displayLoginForm = (e) => {
        e.preventDefault();
        setShowForm(!showLoginForm);
    }

    // enabling controlled inputs

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs({...inputs, [name]: value});
    }

    const handleLoginInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setloginInputs({...loginInputs, [name]: value});
    }



    // Conditional rendering
    if(loading){
        return <Loader/>
    }
    if(showLoginForm) {
        return <LoginForm showSignupForm={showSignupForm} HandleLoginForm={HandleLoginForm} loginInputs={loginInputs} handleLoginInputs={handleLoginInputs} setUser={setUser} loggedIn={loggedIn} setLogIn={setLogIn} setLoading={setLoading}  displayModal={displayModal} setModal={setModal} dispatch={dispatch}/> 
    }else {
        return <SignUpForm displayLoginForm={displayLoginForm} inputs={inputs} handleOnChange={handleOnChange} handleSignup={handleSignup} setInputs={setInputs} setShowForm={setShowForm}/>
    }
}


const LoginForm = ({showSignupForm, HandleLoginForm, loginInputs, handleLoginInputs, setUser, loggedIn, setLogIn, loading, setLoading, displayModal, setModal, dispatch}) => {
    
    const myLoading = () => {
        setLoading(!loading)
    }

    const updateModal = (result) => {
        setLoading(false);
        setModal({display: !displayModal.display, content: result})

        setTimeout(() => {
            setModal({display: false, content: ""})
        }, 2000)
    }

    return(
        
        <section className="login-form-container">

            <h3 className="app-name">Random App</h3>
            {displayModal.display && <Modal content={displayModal.content}/>}

            <form>
                <input className="username" name="username" type="text" placeholder="Enter your username" value={loginInputs.username} onChange={handleLoginInputs} />
                <input type="password" name="password" placeholder="Enter your password" value={loginInputs.password} onChange={handleLoginInputs}/>
                <div className="login-form-buttons">
                    <button className="login-btn" type="submit" onClick={(e)=> HandleLoginForm(e, loginInputs, setUser, loggedIn, setLogIn, myLoading, updateModal, dispatch)}>Login</button>
                    <button type="submit" onClick={(e)=> HandleLoginForm(e, defaultAuth, setUser, loggedIn, setLogIn, myLoading, updateModal, dispatch)}>Use Default Account</button>
                </div>
                <button className="to-signup-btn" type="submit" onClick={showSignupForm}>Signup</button>
            </form>

        </section>
    )
}


const SignUpForm = ({displayLoginForm, inputs,handleOnChange, handleSignup, setInputs, setShowForm}) => {

    const [displayModal, updateModal] = useState({display: false, content: ""})

    const resetInputs = () => {
        setInputs({fullname: "", username: "", password: ""})
    }

    const showModal = (response)=> {
        updateModal({display: true, content: response})
        resetInputs();

        setTimeout(() => {
            updateModal({display: false, content:""});
            setShowForm(true);
        }, 2000);
    }

    return(
        
        <section className="signup-form-container">
    
            <h3 className="app-name">Random App</h3>
            {displayModal.display && <Modal content={displayModal.content}/>}
            <form>
                <input className="username" type="text" placeholder="Enter your username" name="username" value={inputs.username}  onChange={handleOnChange}/>
                <input type="text" placeholder="Enter your fullname" name="fullname" value={inputs.fullname} onChange={handleOnChange}/>
                <input type="password" placeholder="Enter your password"  name="password" value={inputs.password} onChange={handleOnChange}/>
                <div className="login-form-buttons">
                    <button className="login-btn" type="submit" onClick={(e) => handleSignup(e, inputs, showModal)}>SignUp</button>
                    <button className="return-btn"type="submit" onClick={displayLoginForm}>👈Login Form</button>
                </div>
            </form>

        </section>
    )
}

const Loader = () => {

    return (
        <section className="loader-container">
            <div className="loader"></div>
        </section>
    )
}

export default Forms;