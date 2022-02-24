const ScreenDiv = ({ children, className, ...restProps }) => {
    return (
        <div
            className={"h-screen w-screen overflow-clip p-10 md:p-20 sm:p-1 " + className}
            {...restProps}
        >
            {children}
        </div>
    );
}

export default ScreenDiv;