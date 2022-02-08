import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import BlogViewer from "../../../../components/BlogViewer";
import Card from "./Card";
import ElevatedButton from "./ElevatedButton";

// TODO: make tags work like dev.to
const MainPage = () => {

    const [showPreview, setShowPreview] = useState(false);

    return (
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
            >
                {({ values: { title, body } }) => (
                    showPreview ?
                        <BlogViewer title={title}>{body}</BlogViewer>
                        : <Form className='flex flex-col flex-grow'>
                            <Field name='title' placeholder='Some kick-ass title!' className='text-5xl' />
                            <ErrorMessage name="title" component='p' />
                            <Field name='tags' placeholder='javascript,react,next-js...' />
                            <ErrorMessage name='tags' />
                            <Field as='textarea' name='body'
                                placeholder='Write your blog post here!'
                                className='border-4 rounded-xl my-2 flex-1 h-auto' />
                            <ErrorMessage name='textarea' />
                            <div className="flex flex-row w-full justify-end text-white">
                                <ElevatedButton>Save draft</ElevatedButton>
                                <ElevatedButton className='bg-blue-500'>Submit</ElevatedButton>
                            </div>
                        </Form>
                )}
            </Formik>
        </Card>
    )
}

export default MainPage;