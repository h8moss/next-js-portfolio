import { ErrorMessage, Field } from "formik";
import { motion } from "framer-motion";

import useI18n from "../../../hooks/useI18n";
import i18n from "../i18n";

const Password2 = ({ className }) => {

    const { repeatTxt } = useI18n(i18n);

    return (
        <motion.div className='flex flex-col overflow-clip'
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: '100px' }}
        >
            <label htmlFor="password2" >{repeatTxt}</label>
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