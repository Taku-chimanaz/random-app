const Messages = ({setMessagesOverlay}) => {

    return (
        <section className="discover">
            
            <div className="accounts">
            <button className="close-discover" onClick={() => setMessagesOverlay(false)}>&times;</button>
               <h3>Feature coming soon</h3>
            </div>

        </section>
    )
}

export default Messages;