import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";


const FriendListComponent = () => {
    const [friendList, setFriendList] = useState([])
    const { getFollowing } = useContext(UserContext);

    useEffect(() => {
        getFollowing()
    }, [])

    return (
        <div>
            {
                friendList.map((userName, index) => (
                    <button key={index} className="d-block mb-2 w-100 btn btn-outline-dark">{userName}</button>
                ))
            }
        </div>
    );
}

export default FriendListComponent;