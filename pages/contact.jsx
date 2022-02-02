import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import WithWillExit from "../components/WithWillExit";
import style from '../styles/Contact.module.css'
import { server } from '../config';

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
    // TODO: add email validation

    return errors;
}

const _send = async (values, { setSubmitting, resetForm, setFieldError }, onSuccess, onFailure) => {
    const name = values.name;
    const message = values.message;
    const email = values.email ? values.email : null;

    const res = await fetch(`${server}/api/contact`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            message: message,
            email: email,
        })
    });

    if (res.status !== 200) {
        setFieldError('general', 'Something went wrong!');
        onFailure()
    } else {
        resetForm();
        onSuccess();
    }
    setSubmitting(false);
}

function Skills({ willExit }) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setTimeout(() => setLoaded(true), 50), []);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        let time = setTimeout(() => {
            if (showErrorToast) setShowErrorToast(false);
            if (showSuccessToast) setShowSuccessToast(false);
        }, 1000);
        return () => clearTimeout(time)
    }, [showErrorToast, showSuccessToast]);


    const mySend = (data, formik) => {
        _send(data, formik, () => { setShowSuccessToast(true) }, () => { setShowErrorToast(true) });
    }

    const showForm = (!willExit && loaded);

    return (
        <div className="w-screen h-screen p-16 px-60">
            <div className="w-full h-full">
                <h1 className={"text-3xl w-1/2 text-center mx-auto transition-all " + (showForm ? '' : 'text-transparent')}>Wanna talk about a project, wish me a nice day or tell me how my website sucks? You are in the right place!</h1>
                {/* make the title fade in and out, but whe it fades, the text cycles */}
                <div className={`bg-red-500 w-80 p-8 rounded-xl absolute bottom-5 left-5 transition-transform ${showErrorToast ? 'translate-x-0' : '-translate-x-96'}`}>
                    <p>Something went wrong! Please try again later</p>
                </div>
                <div className={`bg-green-500 w-80 p-8 rounded-xl absolute bottom-5 left-5 transition-transform ${showSuccessToast ? 'translate-x-0' : '-translate-x-96'}`}>
                    <p>Message successfully received!</p>
                </div>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        message: '',
                    }}
                    validate={_validate}
                    onSubmit={mySend}
                >
                    {({ isSubmitting, errors }) => (<Form className="flex flex-col w-full">
                        <label htmlFor="name" className={`transition-all duration-500 ${(showForm ? '' : 'text-transparent')}`}>What's your name?</label>
                        <Field name="name" type="text" className={`${style.fieldTransition} bg-zinc-700 rounded-xl  ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'} ${style.field}`} />
                        {showForm && <ErrorMessage name="name" className={style.errorMessage} component={'p'} />}

                        <label
                            htmlFor="email"
                            className={`transition-all duration-500  ${!willExit ? 'delay-500' : ''}  ${(showForm ? '' : 'text-transparent')}`}
                        >
                            What's your email?  <span
                                className={`text-sm transition-all duration-500  ${!willExit ? 'delay-500' : ''} ${(showForm ? 'text-gray-300' : 'text-transparent')}`}
                            >
                                (optional)
                            </span>
                        </label>
                        <Field name="email" className={`${style.fieldTransition} duration-500 ${!willExit ? 'delay-500' : ''} bg-zinc-700 rounded-xl  ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'} ${style.field}`} />
                        {showForm && <ErrorMessage name="email" className={style.errorMessage} component={'p'} />}

                        <label htmlFor="message" className={`transition-all duration-500 ${!willExit ? 'delay-1000' : ''}  ${(showForm ? '' : 'text-transparent')}`} >What do you want to tell me?</label>
                        <Field name="message" as='textarea' className={`${style.fieldTransition} duration-500 bg-zinc-700 rounded-xl h-52 ${!willExit ? 'delay-1000' : ''} ${showForm ? ('w-full p-1 ' + style.field) : 'w-0'}`} />
                        {showForm && <ErrorMessage name="message" className={style.errorMessage} component={'p'} />}
                        {
                            isSubmitting ?
                                <p>...</p>
                                : <button type="submit" className={`transition-all duration-300 delay-[1500]  ${(showForm ? 'text-white' : 'text-transparent')}`}>Submit</button>
                        }
                    </Form>
                    )
                    }
                </Formik >
            </div >
        </div >
    );
}

export default () => WithWillExit(Skills);

