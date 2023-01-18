import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkHeadingID from "remark-heading-id";

import Button from "../../components/Button";
import DarkModeSwitch from "../../components/NavBar/NavigationButtons/DarkModeSwitch/DarkModeSwitch";
import createKeyValueContext from "../../context/keyValue";
import CodeComponent from "../../domain/admin/create-blog-post/CodeComponent";
import CodeComponentManager from "../../domain/admin/create-blog-post/CodeComponent/CodeComponentManager";
import styles from "../../domain/admin/create-blog-post/create-blog-post.module.css";
import { BsLink45Deg } from "react-icons/bs";
import remarkOEmbed from "@agentofuser/remark-oembed";
import Toast from "../../components/Toast";
import useToastText from "../../hooks/useToastText";

interface FormData {
  title: string;
  tags: string[];
  body: string;
}

const CreateBlogPost = () => {
  const onSubmit = (values: FormData) => {};

  const [showPreview, setShowPreview] = useState(false);
  const [stored, setStored] = useState({
    title: "",
    tags: [],
    body: "",
  });

  const [toastProps, setToastText] = useToastText({
    props: {
      className: "bg-gray-500 text-white",
    },
  });

  return (
    <>
      <Toast {...toastProps} />
      <div className="h-screen overflow-auto p-8">
        <DarkModeSwitch />
        {showPreview ? (
          <CodeComponentManager>
            <div className={styles.preview}>
              <button onClick={() => setShowPreview(false)}>X</button>
              <div>
                <h1 className="p-2 m-2">{stored.title}</h1>
                <div>
                  <ReactMarkdown
                    remarkPlugins={[remarkHeadingID, remarkOEmbed]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const body = String(children).replace(/\n$/, "");
                        const classNameMatch = /language-(\w+)/.exec(
                          className || ""
                        );

                        if (inline || !classNameMatch) {
                          return (
                            <code
                              className={`${className || ""} ${
                                styles.inlineCode
                              }`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }

                        let split = body.split(/\n---(\w+)\n/g);

                        split = [classNameMatch[1], ...split];
                        let splitTxt = split.filter((v, i) => i % 2 == 1);
                        let splitLang = split.filter((v, i) => i % 2 == 0);

                        return (
                          <CodeComponent
                            langArray={splitLang}
                            textArray={splitTxt}
                            onCopySuccess={() => setToastText("copied code!")}
                          />
                        );
                      },
                      h1: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1 ">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h1 id={id} {...props}>
                            {children}
                          </h1>
                        </div>
                      ),

                      h3: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1 ">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h3 id={id} {...props}>
                            {children}
                          </h3>
                        </div>
                      ),

                      h4: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1 ">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h4 id={id} {...props}>
                            {children}
                          </h4>
                        </div>
                      ),

                      h5: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h5 id={id} {...props}>
                            {children}
                          </h5>
                        </div>
                      ),

                      h6: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h6 id={id} {...props}>
                            {children}
                          </h6>
                        </div>
                      ),

                      h2: ({ id, children, ...props }) => (
                        <div className="flex">
                          {id && (
                            <a href={`#${id}`} className="h-min my-auto px-1 ">
                              <BsLink45Deg size={30} className="m-auto h-min" />
                            </a>
                          )}
                          <h2 id={id} {...props}>
                            {children}
                          </h2>
                        </div>
                      ),
                    }}
                  >
                    {stored.body}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </CodeComponentManager>
        ) : (
          <Formik<FormData> initialValues={stored} onSubmit={onSubmit}>
            {({ setFieldValue, values }) => (
              <Form className="flex flex-col p-4">
                <Field
                  name="title"
                  placeholder="Title"
                  className="p-4 my-2 rounded-md"
                />
                <div className="bg-white rounded-md p-2 flex flex-col">
                  <input
                    placeholder="Write tags here"
                    className="p-4 my-2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value.at(-1) === " ") {
                        const value = e.target.value.trim();
                        if (!values.tags.includes(value))
                          setFieldValue("tags", [...values.tags, value]);
                        e.target.value = "";
                      }
                    }}
                  />
                  <div className="flex">
                    {values.tags.map((v, i) => (
                      <div
                        key={v}
                        className="bg-gray-300 text-black p-1 rounded-md m-1 text-sm group cursor-pointer"
                        onClick={() => {
                          const l = [...values.tags];
                          l.splice(i, 1);
                          setFieldValue("tags", l);
                        }}
                      >
                        {v} <span className="group-hover:text-red-500">x</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Field
                  name="body"
                  className="p-4 my-2 rounded-md"
                  as="textarea"
                  rows="10"
                  placeholder="body"
                />
                <div className="flex justify-around">
                  <Button type="submit">Submit</Button>
                  <Button
                    onClick={() => {
                      setStored(values);
                      setShowPreview(true);
                    }}
                    type="button"
                  >
                    Preview
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default CreateBlogPost;
