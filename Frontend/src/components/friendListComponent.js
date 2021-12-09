import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";

const FriendListComponent = () => {
    const { getFollowing, friendList } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            await getFollowing()
        })()
    }, [])

    return (
        <div className="mx-2">
            {
                friendList.map(({ id, nome }) => (
                    // <button key={id} className="d-block mb-2 w-100 btn btn-outline-dark">{nome}</button>
                    <div className="d-flex mb-2 w-100 border border-dark rounded p-2 justify-content-between text-center">
                        <div/>
                        <h5 className="d-flex my-auto">{nome}</h5>
                        <div>
                            <Link to={`/profile/${id}`}className="btn btn-outline-dark">
                                <i className="fas fa-book"></i>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default FriendListComponent;