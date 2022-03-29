const Button = ({ onClick, children, color }) => {
    return (
        <button
            onClick={onClick}
            className='p-3 hover:scale-105'
            style={{ color }}
        >
            {children}
        </button>
    );
}

export default Button;