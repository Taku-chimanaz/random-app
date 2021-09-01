const Notifications = ({setNotificationsOverlay}) => {

    return (
        <section className="discover">
            
            <div className="accounts">
            <button className="close-discover" onClick={() => setNotificationsOverlay(false)}>&times;</button>
               <h3>Feature coming soon</h3>
            </div>

        </section>
    )
}

export default Notifications;