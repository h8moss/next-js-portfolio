import { useRouter } from "next/router";
import React, { useState } from "react"
import NavBar from "./NavBar";

export default function WithWillExit(Component) {

    const [willExit, setWillExit] = useState(false);
    const router = useRouter()

    const willExitProps = { willExit: willExit };
    const currentRoute = router.pathname;

    return (
        <div>
            <NavBar onClick={(route) => {
                if (currentRoute !== route)
                    setWillExit(true)
            }} delay={500} />
            <Component {...willExitProps} />
        </div>
    );
}