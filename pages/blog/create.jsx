import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ScreenDiv from "../../components/ScreenDiv";
import WithWillExit from "../../components/WithWillExit";
import Loading from "../../domain/blog/create/Loading";
import MainPage from "../../domain/blog/create/MainPage";
import NotAllowed from "../../domain/blog/create/NotAllowed";
import useUser from "../../hooks/useUser";

const getPage = (isAdmin) => {
    switch (isAdmin) {
        case null:
            return <Loading />
        case false:
            return <NotAllowed />
        case true:
            return <MainPage />
    }
}

function BlogCreate() {
    let user = useUser();
    let router = useRouter();

    let [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        setIsAdmin(user !== null && user.isAdmin);
    }, [user, router]);

    return (
        <ScreenDiv className='overflow-y-auto'>
            {getPage(isAdmin)}
        </ScreenDiv>
    )
}



const willExit = (props) => WithWillExit(BlogCreate, props);

export default willExit;