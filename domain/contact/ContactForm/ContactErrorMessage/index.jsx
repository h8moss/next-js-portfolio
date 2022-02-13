import { ErrorMessage } from "formik";
import { MotionConfig } from "framer-motion";

const ContactErrorMessage = ({ name }) => {
    return (
        <ErrorMessage
            name={name}
            className='text-red-500 text-sm'
            component={'p'}
        />
    );
}

export default ContactErrorMessage;