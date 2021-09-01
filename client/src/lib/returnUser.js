export const returnUser = async (owner, setOwner, index) => {
    console.log("request sent" + index)
    const userID = JSON.stringify(owner);
    fetch(`http://localhost:5000/api/users/${userID}`, {method: "GET"})
    .then(res => res.json())
    .then(user =>{
        setOwner(user)
    })
    .catch(() => "Failed to send request")
}