import { useState } from "react";
import { getAuthService, useUser } from "../services/firebase/auth";
import StyledButton from "./StyledButton";
import { useRouter } from "next/router";

export default () => {

    let user = useUser();
    let router = useRouter();
    let [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);
    const logOut = async () => {

        await getAuthService().signOut();

        router.reload();
    }

    return (
        <>
            {user !== null &&
                <button className="top-0 right-0 mt-3 mr-10 absolute rounded-3xl hover:rounded-md overflow-clip transition-all" onClick={togglePopup}>
                    <img src={user.photoURL} alt='user profile pic' className="w-8 h-8" />
                </button>}
            {showPopup &&
                <div className="bg-black bg-opacity-40 w-screen h-screen top-0 left-0 absolute" onClick={togglePopup} >
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col bg-green-500 w-52 absolute top-0 right-32">
                            <button>Profile</button>
                            <button>Light mode</button>
                            <button>Language</button>
                            <button onClick={() => logOut()}>Log out</button>
                        </div>
                    </div>
                </div>}
        </>
    );
}