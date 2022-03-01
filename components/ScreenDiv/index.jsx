const ScreenDiv = ({ children, className, ...restProps }) => {
    return (
        <div
            className={"h-screen w-screen overflow-clip md:p-20 p-3 py-10 " + className}
            {...restProps}
        >
            {children}
        </div>
    );
}

export default ScreenDiv;