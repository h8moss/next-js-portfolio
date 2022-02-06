import Router from "next/router";

const goTo = async (url, delay, onStart) => {
    if (onStart !== undefined)
        onStart()
    setTimeout(() => {
        Router.push(url);
    }, delay);
}

export default function StyledButton({ children, className, href, delay, onStart }) {

    return (
        <button
            className={`text-base hover:text-xl transition-all cursor-pointer ${className}`}
            onClick={() => goTo(href, delay, onStart)}
        >
            {children}
        </button>
    );
}