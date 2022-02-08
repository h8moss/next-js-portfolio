import WithWillExit from "../../components/WithWillExit";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../../domain/blog/create/Loading";
import NotAllowed from "../../domain/blog/create/NotAllowed";
import MainPage from "../../domain/blog/create/MainPage";
import ScreenDiv from "../../components/ScreenDiv";

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