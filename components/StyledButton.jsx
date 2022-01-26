import Router from "next/router";
import { useEffect } from "react";

const goTo = async (url, delay, onStart) => {
    if (onStart !== undefined)
        onStart()
    setTimeout(() => {
        Router.push(url);
    }, delay);
}

export default function StyledButton({ children, extraClass, href, delay, onStart }) {

    return (
        <button
            className={`text-base hover:text-xl transition-all cursor-pointer ${extraClass}`}
            onClick={() => goTo(href, delay, onStart)}
        >
            {children}
        </button>
    );
}