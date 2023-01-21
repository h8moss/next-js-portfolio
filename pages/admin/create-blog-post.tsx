import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import BlogViewer from "../../components/BlogViewer";
import Button from "../../components/Button";
import DarkModeSwitch from "../../components/NavBar/NavigationButtons/DarkModeSwitch/DarkModeSwitch";
import { locales } from "../../constants";
import styles from "../../domain/admin/create-blog-post/create-blog-post.module.css";
import { firestore } from "../../services/firebase";
import { Locale } from "../../types";

interface FormData {
  title: string;
  tags: string[];
  body: string;
  language: Locale;
}

const CreateBlogPost = () => {
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    try {
      const document = await addDoc(
        collection(firestore, `blog-posts-${values.language}`),
        {
          body: values.body,
          tags: values.tags,
          title: values.title,
          created: Timestamp.now(),
        }
      );
      await updateDoc(draftDoc, {
        body: "",
        title: "",
        tags: [],
      });
    } catch (e) {
      console.error({ e });
      return;
    }

    router.push(`/admin`);
  };

  const [showPreview, setShowPreview] = useState(false);
  const [stored, _setStored] = useState<FormData>({
    title: "",
    tags: [],
    body: "",
    language: "en",
  });

  const currentValues = useRef<FormData | null>(null);
  const changeCounter = useRef(0);

  const draftDoc = useMemo(() => doc(firestore, "/admin/draft"), []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const sn = await getDoc(draftDoc);

      console.log({ exists: sn.exists(), data: sn.data() });

      if (sn.exists()) {
        const data = sn.data();

        _setStored(({ language }) => ({
          tags: data.tags,
          body: data.body,
          title: data.title,
          language,
        }));
      }

      setIsLoading(false);
    })();
  }, [draftDoc]);

  const increaseCount = (amount: number) => {
    changeCounter.current = changeCounter.current + amount;
    console.log({
      changeCount: changeCounter.current,
    });
    if (changeCounter.current >= 50) {
      changeCounter.current = 0;

      saveStored(currentValues.current);
    }
  };

  const valuesChanged = async (values: FormData) => {
    if (
      currentValues.current === null ||
      currentValues.current.body !== values.body ||
      currentValues.current.tags !== values.tags ||
      currentValues.current.title !== values.title
    ) {
      const difference =
        Math.abs(
          currentValues.current?.body?.length ?? 0 - values.body.length
        ) +
          Math.abs(
            currentValues.current?.title?.length ?? 0 - values.title.length
          ) +
          Math.abs(
            (currentValues.current?.tags?.join("") ?? "").length -
              values.tags.join("").length
          ) || 1;
      currentValues.current = { ...values };
      increaseCount(difference);
    }
  };

  const saveStored = (values: FormData) => {
    _setStored(values);

    // asynchronously save into database
    (async () => {
      await updateDoc(draftDoc, {
        body: values.body,
        title: values.title,
        tags: values.tags,
      });
    })();
  };

  return (
    <>
      <div className="h-screen overflow-auto p-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <DarkModeSwitch />
            {showPreview ? (
              <div>
                <button onClick={() => setShowPreview(false)}>X</button>
                <BlogViewer post={stored} />
              </div>
            ) : (
              <Formik<FormData> initialValues={stored} onSubmit={onSubmit}>
                {({ setFieldValue, values }) => (
                  <Form className={`flex flex-col p-4 mx-auto ${styles.form}`}>
                    {(() => {
                      valuesChanged(values);

                      return <></>;
                    })()}

                    <Field as="select" name="language">
                      {locales.map((l) => (
                        <option value={l} key={l}>
                          {l}
                        </option>
                      ))}
                    </Field>

                    <Field
                      name="title"
                      placeholder="Title"
                      className="p-4 my-2 rounded-md"
                    />
                    <div className="bg-white rounded-md p-1 flex flex-col">
                      <input
                        placeholder="Write tags here"
                        className="p-2 my-2"
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
                            {v}{" "}
                            <span className="group-hover:text-red-500">x</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Field
                      name="body"
                      className="p-4 my-2 rounded-md"
                      as="textarea"
                      rows="80"
                      placeholder="body"
                    />
                    <div className="flex justify-around">
                      <Button type="submit">Submit</Button>
                      <Button
                        onClick={() => {
                          saveStored(values);
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
          </>
        )}
      </div>
    </>
  );
};

export default CreateBlogPost;
