import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import WithWillExit from "../components/WithWillExit";
import style from '../styles/Contact.module.css'

const _validate = values => {
    let errors = {};

    if (!values.name) {
        errors.name = 'This field is required!';
    } else if (values.name.length > 30) {
        errors.name = 'Your name is too long!';
    }
    if (!values.message) {
        errors.message = 'This field is required!';
    } else if (values.message.length > 300) {
        errors.message = 'Your message is too long!';
    }

    return errors;
}

function Skills({ willExit }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => setTimeout(() => setLoaded(true), 50), []);

    const showForm = (!willExit && loaded);
    console.log(showForm);

    return (
        <div className="w-screen h-screen p-16 px-60">
            <div className="w-full h-full">
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        message: '',
                    }}
                    validate={_validate}
                    onSubmit={values => { }}
                >
                    <Form className="flex flex-col w-full">
                        <label htmlFor="name" className={`transition-all duration-500  ${(showForm ? '' : 'text-transparent')}`}>What's your name?</label>
                        <Field name="name" type="text" className={`${style.fieldTransition} bg-zinc-700 rounded-xl  ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'} ${style.field}`} />
                        {showForm && <ErrorMessage name="name" className={style.errorMessage} component={'p'} />}

                        <label htmlFor="email" className={`transition-all duration-500  ${!willExit ? 'delay-500' : ''}  ${(showForm ? '' : 'text-transparent')}`} >What's your email? (optional)</label>
                        <Field name="email" type="email" className={`${style.fieldTransition} duration-500 ${!willExit ? 'delay-500' : ''} bg-zinc-700 rounded-xl  ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'} ${style.field}`} />
                        {showForm && <ErrorMessage name="email" className={style.errorMessage} component={'p'} />}

                        <label htmlFor="message" className={`transition-all duration-500 ${!willExit ? 'delay-1000' : ''}  ${(showForm ? '' : 'text-transparent')}`} >What do you want to tell me?</label>
                        <Field name="message" as='textarea' className={`${style.fieldTransition} duration-500 bg-zinc-700 rounded-xl h-64 ${!willExit ? 'delay-1000' : ''} ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'}`} />
                        {showForm && <ErrorMessage name="message" className={style.errorMessage} component={'p'} />}

                        <button type="submit" className={`transition-all duration-300 delay-[1500]  ${(showForm ? 'text-white' : 'text-transparent')}`}>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default () => WithWillExit(Skills);

