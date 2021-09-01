import React, {useState} from 'react';
import Messages from './Messages';
import Notifications from './Notifications';

const Navbar = React.memo(({messages, notifications, setLogIn}) => {

    const [messagesOverlay, setMessagesOverlay] = useState(false);
    const [notificationsOverlay, setNotificationsOverlay] = useState(false);

    const logout = () => {
        setLogIn(false)
    };

    return(
        <header>
            {messagesOverlay && <Messages setMessagesOverlay={setMessagesOverlay}/>}
            {notificationsOverlay && <Notifications setNotificationsOverlay={setNotificationsOverlay}/>}
            <div className="logo">
                <h3>random app</h3>
            </div>

            <nav>
                <a href="#" className="active">Home</a>
                <a href="#">Subscriptions</a>
                <a href="#" onClick={() => setMessagesOverlay(true)}>Messages<span>{messages > 0 && messages}</span></a>
                <a href="#" onClick={() => setNotificationsOverlay(true)}>Notifications<span>{notifications > 0 && notifications}</span></a>
            </nav>

            <div className="buttons">
                <button className="logout" onClick={logout}>logout</button>
                <button>report</button>
            </div>

        </header>
    )
});

export default Navbar;