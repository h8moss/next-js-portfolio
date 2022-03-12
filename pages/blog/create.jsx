import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import ScreenDiv from "../../components/ScreenDiv";
import { Loading, MainPage, NotAllowed } from "../../domain/blog/create";
import i18n from '../../domain/blog/i18n';
import useI18n from '../../hooks/useI18n';
import useUser from "../../hooks/useUser";

const getPage = ({ isAdmin, onExit, shouldStay }) => {
    switch (isAdmin) {
        case null:
            return <Loading />
        case false:
            return <NotAllowed onExit={onExit} shouldStay={shouldStay} />
        case true:
            return <MainPage onExit={onExit} shouldStay={shouldStay} />
    }
}

function BlogCreate() {

    let user = useUser();
    let router = useRouter();
    const [nextRoute, setNextRoute] = useState(router.pathname);

    let [isAdmin, setIsAdmin] = useState(null);

    let { createTitle } = useI18n(i18n);

    useEffect(() => {
        setIsAdmin(user !== null && user.isAdmin);
    }, [user, router]);

    return (
        <>
            <Head>
                <title>{createTitle}</title>
            </Head>
            <NavBar
                onClick={(route) => setNextRoute(route)}
            />
            <ScreenDiv className='overflow-y-auto'>
                {getPage({
                    isAdmin: isAdmin,
                    onExit: () => router.push(nextRoute),
                    shouldStay: nextRoute === router.pathname,
                })}
            </ScreenDiv>
        </>
    )
}



export default BlogCreate;