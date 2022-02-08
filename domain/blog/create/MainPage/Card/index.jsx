const Card = ({ className, children, ...props }) =>
(<div
    className={`bg-white shadow-lg w-[70%] 
    rounded-lg p-5 mx-auto text-gray-800
    my-4 flex flex-col h-auto min-h-full ` + className}
    {...props}
>
    {children}
</div>);

export default Card;