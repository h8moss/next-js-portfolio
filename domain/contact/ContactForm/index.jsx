import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";

import StyledButton from "../../../components/StyledButton";
import useUser from "../../../hooks/useUser";
import validate from '../api/validate';
import ContactErrorMessage from "./ContactErrorMessage";
import FieldMotion from "./FieldMotion";
import Label from './Label';
import style from './style.module.css';

const ContactForm = ({ submit, show = true }) => {

    const user = useUser();
    let mail = user !== null ? user.mail : '';

    console.log({ user, mail });

    return (
        <Formik
            initialValues={{
                name: '',
                email: mail,
                message: '',
            }}
            validate={validate}
            onSubmit={submit}
        >
            {({ isSubmitting, submitForm }) => (
                <Form className={style.form}>
                    <AnimatePresence>
                        {show &&
                            <>
                                <Label htmlFor="name" show={show}>
                                    What&apos;s your name?
                                </Label>
                                <FieldMotion>
                                    <Field name="name" type="text" className={style.field + ' w-full'} />
                                </FieldMotion>
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ContactErrorMessage name="name" />
                                </motion.div>
                                <Label htmlFor="email" show={show}>
                                    What&apos;s your email?
                                    <span className='text-sm'> (optional)
                                    </span>
                                </Label>
                                <FieldMotion>
                                    <Field name="email" className={style.field} />
                                </FieldMotion>
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ContactErrorMessage name="email" />
                                </motion.div>
                                <Label htmlFor="message" show={show}>
                                    What do you want to tell me?
                                </Label>
                                <FieldMotion className='flex-grow'>
                                    <Field
                                        name="message"
                                        as='textarea'
                                        className={style.field + ' h-full'}
                                    />
                                </FieldMotion>
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <ContactErrorMessage name="message" />
                                </motion.div>

                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    initial={{ x: '10vh', opacity: 0 }}
                                    exit={{ x: '100vw', opacity: 0 }}
                                    animate={{ x: '0', opacity: 1 }}
                                    className='w-min mx-auto my-3'
                                    onClick={() => {
                                        if (!isSubmitting) {
                                            submitForm();
                                        }
                                    }}
                                >
                                    Submit
                                </motion.button>
                            </>
                        }
                    </AnimatePresence>
                </Form>
            )
            }
        </Formik >
    )
}


export default ContactForm;