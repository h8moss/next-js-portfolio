const ElevatedButton = ({ children, className, ...props }) =>
(<button className={'p-3 mx-2 bg-purple-500 rounded-xl text-white ' + className}
    {...props}
>
    {children}
</button>);

export default ElevatedButton;