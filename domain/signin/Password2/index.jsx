import { ErrorMessage, Field } from "formik";
import { motion } from "framer-motion";

const Password2 = ({ className }) => {
    return (
        <motion.div className='flex flex-col overflow-clip'
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: '100px' }}
        >
            <label htmlFor="password2" >Repeat password</label>
            <Field name="password2" type='password' />
            <ErrorMessage
                name="password2"
                component={'p'}
                className={className}
            />
        </motion.div>
    );
}

export default Password2;