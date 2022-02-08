import WithWillExit from "../../components/WithWillExit";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function BlogCreate() {
    let user = useUser();
    let router = useRouter();

    let [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        setIsAdmin(user !== null && user.isAdmin);
    }, [user, router]);

    switch (isAdmin) {
        case null:
            return (<p>Loading...</p>);
        case false:
            return (<p>Insufficient permissions</p>);
        case true:
            return (<p>Welcome!</p>);
    }

    return <div></div>
}

const willExit = (props) => WithWillExit(BlogCreate, props);

export default willExit;