import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";

import useI18n from "../../../hooks/useI18n";
import useUser from "../../../hooks/useUser";
import validate from '../api/validate';
import i18n from "../i18n";
import ContactErrorMessage from "./ContactErrorMessage";
import FieldMotion from "./FieldMotion";
import Label from './Label';
import style from './style.module.css';

const ContactForm = ({ submit, show = true }) => {

    const user = useUser();
    let mail = user !== null ? user.mail : '';

    const {
        emailQuestion,
        messageQuestion,
        nameQuestion,
        optionalText,
        submitButton
    } = useI18n(i18n);

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
                    <>
                        <Label htmlFor="name" show={show}>
                            {nameQuestion}
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
                            {emailQuestion}
                            <span className='text-sm'> {optionalText}
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
                            {messageQuestion}
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
                        <div className="flex md:flex-row flex-col justify-center">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                initial={{ x: '10vh', opacity: 0 }}
                                exit={{ x: '100vw', opacity: 0 }}
                                animate={{ x: '0', opacity: 1 }}
                                className='w-min my-auto rounded-lg bg-purple-400 p-3'
                                onClick={() => {
                                    if (!isSubmitting) {
                                        submitForm();
                                    }
                                }}
                            >
                                {submitButton}
                            </motion.button>
                            <motion.p
                                className="my-auto ml-5 mr-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                or email me at
                            </motion.p>
                            <motion.a
                                className="my-auto w-min text-purple-300 hover:underline"
                                href="mailto:h8mosscontact@gmail.com"
                                target='_blank'
                                rel='noreferrer'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                h8mosscontact@gmail.com
                            </motion.a>
                        </div>
                    </>
                </Form>
            )
            }
        </Formik >
    )
}


export default ContactForm;