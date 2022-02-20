import { motion } from "framer-motion";

const SigninButton = ({ children, className, onClick, ...props }) => {
    return (
        <motion.button
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            className={'border-2 rounded-md p-3 px-5 w-fit whitespace-nowrap mx-auto my-3 '
                + className}

            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
}

export default SigninButton;