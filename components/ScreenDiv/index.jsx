const ScreenDiv = ({ children, className, ...restProps }) => {
    return (
        <div
            className={"h-screen w-screen overflow-clip p-20 " + className}
            {...restProps}
        >
            {children}
        </div>
    );
}

export default ScreenDiv;