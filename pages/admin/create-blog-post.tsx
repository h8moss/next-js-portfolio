import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getBytes, getDownloadURL, ref } from "firebase/storage";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Linter } from "remark-linter";
import { LintError } from "remark-linter/lib";

import BlogViewer from "../../components/BlogViewer";
import Button from "../../components/Button";
import DarkModeSwitch from "../../components/NavBar/NavigationButtons/DarkModeSwitch/DarkModeSwitch";
import Toast from "../../components/Toast";
import { locales } from "../../constants";
import styles from "../../domain/admin/create-blog-post/create-blog-post.module.css";
import ImageManager from "../../domain/admin/create-blog-post/ImageManager";
import LintViewer from "../../domain/admin/create-blog-post/LintViewer";
import useToastText from "../../hooks/useToastText";
import { firestore, storage } from "../../services/firebase";
import { createBlogPost } from "../../services/firebase/functions";
import useAuth from "../../services/firebase/hooks/useAuth";
import useStorageFolder from "../../services/firebase/hooks/useStorageFolder";
import { Locale } from "../../types";

interface FormData {
  title: string;
  tags: string[];
  body: string;
  language: Locale;
}

const CreateBlogPost = () => {
  const _ = useAuth({ required: true, loginPage: "/" });

  const router = useRouter();

  const imageStorage = useStorageFolder("draft");

  const [images, setImages] = useState<{ src: string; name: string }[]>([]);
  const [lints, setLints] = useState<LintError[]>([]);

  const getImages = useCallback<
    () => Promise<{ src: string; name: string }[]>
  >(async () => {
    const downloadUrls = await Promise.all(
      imageStorage.files.map((file) => getDownloadURL(file))
    );

    return imageStorage.files.map((file, i) => ({
      src: downloadUrls[i],
      name: file.name,
    }));
  }, [imageStorage.files]);

  useEffect(() => {
    getImages().then((v) => setImages(v));
  }, [getImages]);

  const [canUploadImage, setCanUploadImage] = useState(true);

  const [toastProps, setToastText] = useToastText({});

  const onUploadImage = async (file: File) => {
    if (canUploadImage) {
      setCanUploadImage(false);

      await imageStorage.uploadFile(file);

      setCanUploadImage(true);
    }
  };

  const onSubmit = async (
    values: FormData,
    helpers: FormikHelpers<FormData>
  ) => {
    await saveStored(values);

    helpers.setSubmitting(true);
    const result = await createBlogPost();
    const id = result.data.id;
    helpers.setSubmitting(false);

    router.push(`/admin/blog/private/${id}`, `/admin/blog/private/${id}`, {
      locale: stored.language,
    });
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

      if (sn.exists()) {
        const data = sn.data();

        _setStored({
          tags: data.tags,
          body: data.body,
          title: data.title,
          language: data.language,
        });
      }

      setIsLoading(false);
    })();
  }, [draftDoc]);

  const increaseCount = (amount: number) => {
    changeCounter.current = changeCounter.current + amount;
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

  const saveStored = async (values: FormData) => {
    _setStored(values);

    await updateDoc(draftDoc, {
      body: values.body,
      title: values.title,
      tags: values.tags,
      language: values.language,
    });
  };

  const linter = useMemo(() => new Linter(), []);

  const onLint = async () => {
    setLints([]);
    const result = await linter.lint(stored.body);
    console.log({ lint: result });
    setLints(result);
  };

  return (
    <>
      <Toast className="bg-green-500 text-white" {...toastProps} />
      <div className="h-screen overflow-auto p-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <DarkModeSwitch />
            {showPreview ? (
              <div>
                <button onClick={() => setShowPreview(false)}>X</button>
                <BlogViewer
                  post={stored}
                  storageToUrl={async (name) =>
                    images.find((v) => v.name === name).src
                  }
                  storageToBytes={async (id) => {
                    return await getBytes(ref(storage, "draft/" + id));
                  }}
                />
              </div>
            ) : (
              <>
                <Formik<FormData> initialValues={stored} onSubmit={onSubmit}>
                  {({ setFieldValue, values, isSubmitting }) => (
                    <div className="flex">
                      <Form
                        className={`flex flex-col p-4 flex-[2] mx-auto ${styles.form}`}
                      >
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
                                  setFieldValue("tags", [
                                    ...values.tags,
                                    value,
                                  ]);
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
                                <span className="group-hover:text-red-500">
                                  x
                                </span>
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
                          <Button disabled={isSubmitting} type="submit">
                            Submit
                          </Button>
                          <Button
                            onClick={async () => {
                              await saveStored(values);
                              onLint();
                            }}
                            type="button"
                          >
                            Lint
                          </Button>
                          <Button
                            onClick={async () => {
                              await saveStored(values);
                              setShowPreview(true);
                            }}
                            type="button"
                          >
                            Preview
                          </Button>
                        </div>
                      </Form>
                      <div className="flex-1 flex flex-col">
                        <LintViewer lints={lints} />
                        <ImageManager
                          canUpload={canUploadImage}
                          images={images}
                          onImageClick={async ({ name }) => {
                            await navigator.clipboard.writeText(
                              `![Description here](STORAGE::${name}::)`
                            );
                            setToastText("Copied to clipboard!");
                          }}
                          onUpload={onUploadImage}
                        />
                      </div>
                    </div>
                  )}
                </Formik>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CreateBlogPost;
