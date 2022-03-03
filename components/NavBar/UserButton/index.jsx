// TODO: Rework the whole component

import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from "react";

import useAuth from '../../../hooks/useAuth';
import useI18n from '../../../hooks/useI18n';
import useUser from '../../../hooks/useUser';
import i18n from '../i18n';

export default function UserButton() {

    const auth = useAuth();
    const user = useUser();
    let router = useRouter();
    let [showPopup, setShowPopup] = useState(false);

    const { logout, language } = useI18n(i18n);

    const togglePopup = () => setShowPopup(!showPopup);
    const logOut = async () => {

        await auth.signOut();

        router.reload();
    }

    const hasImage = user?.photoURL !== null;

    return (
        <>
            {user !== null &&
                <button className="top-0 right-0 mt-3 mr-10 absolute rounded-3xl hover:rounded-md overflow-clip transition-all w-8 h-8 z-[98]" onClick={togglePopup}>
                    {hasImage
                        ? <Image src={user.photoURL} alt='user profile pic' layout="fill" />
                        : 'No image' // TODO: Add anon image
                    }
                </button>}
            {showPopup &&
                <div className="bg-black bg-opacity-40 w-screen h-screen top-0 left-0 absolute z-[99]" onClick={togglePopup} >
                    <div onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col bg-gray-500 w-52 absolute top-0 right-32">
                            <button>Profile</button>
                            <button>Light mode</button>
                            <button>{language}</button>
                            <button onClick={() => logOut()}>{logout}</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}