const Button = ({ onClick, children, color, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            className={'p-3 hover:scale-105 ' + className}
            style={{ color }}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;