import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import { useRouter } from 'next/router';
import { useState } from "react";

import BlogViewer from "../../../../components/BlogViewer";
import Card from "../../../../components/Card";
import { db } from "../../../../services/firebase/firestore";
import ElevatedButton from "./ElevatedButton";


const validate = (values) => {
    let errors = {};

    if (!values.title) {
        errors.title = 'This field is required!';
    } else if (values.title.length > 30) {
        errors.title = 'Your title is too long!';
    }
    if (!values.body)
        errors.body = 'This field is required!';

    return errors;
}

const submit = async ({ title, body, tags }, { setSubmitting, resetForm }, router) => {
    let tagsList = tags.split(',').map(item => item.trim());

    let blogPosts = collection(db, '/blog-posts')

    await addDoc(blogPosts, {
        'title': title,
        'tags': tagsList,
        'text': body,
        'created': Timestamp.now(),
    });

    resetForm();
    setSubmitting(false);
    router.push('/blog');
}

// TODO: make tags work like dev.to
const MainPage = ({ onExit, shouldStay }) => {

    const [showPreview, setShowPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const onSaveDraft = async (currentValues) => {
        if (!isSaving) {
            setIsSaving(true);
            let document = doc(db, '/blog/draft');
            await setDoc(document, currentValues)
            setIsSaving(false);
        }
    }

    return (
        <AnimatePresence
            onExitComplete={onExit}>
            {shouldStay &&
                <Card>
                    <div className="flex flex-row">
                        <label htmlFor='preview'>Preview</label>
                        <input
                            type='checkbox'
                            name="preview"
                            className="my-auto mx-3"
                            value={showPreview}
                            onChange={() => setShowPreview(!showPreview)}
                        />
                    </div>
                    <Formik
                        initialValues={{
                            title: '',
                            body: '',
                            tags: '',
                        }}
                        validate={validate}
                        onSubmit={(values, formik) => submit(values, formik, router)}
                    >
                        {({ values: { title, body, tags }, isSubmitting }) => (
                            showPreview ?
                                <BlogViewer title={title}>{body}</BlogViewer>
                                : <Form className='flex flex-col flex-grow'>
                                    <Field name='title' placeholder='Some kick-ass title!' className='text-5xl' />
                                    <ErrorMessage name='title' component='p' className="text-red-500 text-xs" />
                                    <Field name='tags' placeholder='javascript,react,next-js...' />
                                    <ErrorMessage name='tags' component='p' className="text-red-500 text-xs" />
                                    <Field as='textarea' name='body'
                                        placeholder='Write your blog post here!'
                                        className='border-4 rounded-xl my-2 flex-1 h-auto' />
                                    <ErrorMessage name='body' component='p' className="text-red-500 text-xs" />
                                    <div className="flex flex-row w-full justify-end text-white">
                                        <ElevatedButton
                                            className='bg-purple-500'
                                            isSending={isSaving}
                                            onClick={() => onSaveDraft({
                                                'title': title,
                                                'body': body,
                                                'tags': tags,
                                            })}
                                        >
                                            Save draft
                                        </ElevatedButton>
                                        <ElevatedButton
                                            className='bg-blue-500'
                                            isSending={isSubmitting}
                                            type='submit'
                                        >
                                            Submit
                                        </ElevatedButton>
                                    </div>
                                </Form>
                        )}
                    </Formik>
                </Card>}
        </AnimatePresence>
    )
}

export default MainPage;