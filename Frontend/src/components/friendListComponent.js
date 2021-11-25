import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";

const FriendListComponent = () => {
    const { getFollowing, friendList } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            await getFollowing()
        })()
    }, [])

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