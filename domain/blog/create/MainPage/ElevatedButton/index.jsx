const ElevatedButton = ({ children, className, isSending, onClick = () => { }, ...props }) =>
(!isSending &&
    <button
        onClick={onClick}
        className={`p-3 mx-2 rounded-xl text-white 
            scale-100 hover:scale-105 transition-all ` + className}
        {...props}
    >
        {children}
    </button>);

export default ElevatedButton;