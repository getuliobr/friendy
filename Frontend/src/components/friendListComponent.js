import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const FriendListComponent = () => {
    const [friendList, setFriendList] = useState([])
    const { getFollowing } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            setFriendList(await getFollowing())
        })()
    }, [getFollowing])

    return (
        <div>
            {
                friendList.map(({ id, nome }) => (
                    <button key={id} className="d-block mb-2 w-100 btn btn-outline-dark">{nome}</button>
                ))
            }
        </div>
    );
}

export default FriendListComponent;