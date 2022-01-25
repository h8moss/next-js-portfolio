export default function StyledButton({ children, extraClass, href }) {
    return (
        <a className={`text-base hover:text-xl transition-all cursor-pointer ${extraClass}`} href={href}>
            {children}
        </a>
    );
}