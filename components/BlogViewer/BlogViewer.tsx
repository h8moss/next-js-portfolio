import download from "downloadjs";
import { fileDirective, noteDirective } from "my-remark-plugin";
import { HTMLAttributeAnchorTarget } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import directive from "remark-directive";
import remarkHeadingID from "remark-heading-id";

import { server } from "../../config";
import useToastText from "../../hooks/useToastText";
import { BlogPostData } from "../../types";
import Toast from "../Toast";
import AsyncImage from "./AsyncImage";
import styles from "./BlogViewer.module.css";
import CodeComponent from "./CodeComponent";
import CodeComponentManager from "./CodeComponent/CodeComponentManager";
import EditableH1 from "./EditableH1";
import HeadingWithLink from "./HeadingWithLink/HeadingWithLink";

interface Props {
  post: BlogPostData;

  storageToUrl: (id: string) => Promise<string>;
  storageToBytes: (id: string) => Promise<ArrayBuffer>;

  canEdit?: boolean;

  onTitleEdited?: (title: string) => unknown;
  onBodyEdited?: (value: string) => unknown;
}

const BlogViewer = ({
  post: { body, title },
  storageToUrl = async (id) => id,
  storageToBytes = async (id) => new ArrayBuffer(0),
  canEdit = false,
  onTitleEdited,
  onBodyEdited,
}: Props) => {
  const [toastProps, setToastText] = useToastText({
    props: {
      className: "bg-gray-500 text-white",
    },
  });

  const [isEditingBody, setIsEditingBody] = useState(false);
  const [bodyValue, setBodyValue] = useState(body);

  return (
    <>
      <Toast {...toastProps} />
      <CodeComponentManager>
        <div className={styles.content}>
          <div>
            <div className="flex">
              {canEdit ? (
                <EditableH1
                  className="p-2 m-2"
                  text={title}
                  onEditDone={onTitleEdited}
                />
              ) : (
                <h1 className="p-2 m-2">{title}</h1>
              )}
            </div>
            {isEditingBody ? (
              <div className="flex flex-col">
                <textarea
                  value={bodyValue}
                  onChange={(e) => setBodyValue(e.target.value)}
                  rows={10}
                />
                <button
                  onClick={() => {
                    onBodyEdited(bodyValue);
                    setIsEditingBody(false);
                  }}
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                {canEdit && (
                  <button onClick={() => setIsEditingBody(true)}>Edit</button>
                )}
                <ReactMarkdown
                  remarkPlugins={[
                    remarkHeadingID,
                    directive,
                    [
                      noteDirective,
                      {
                        className: styles.note,
                        tag: "div",
                        titleClass: styles.title,
                      },
                  ],
                  [
                    fileDirective,
                    {
                      className: styles.file,
                    },
                  ],
                ]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  button(props) {
                    return (
                      <button
                        onClick={async () => {
                          if ("data-storage" in props) {
                            const dataStorage = props["data-storage"] as string;

                            const bytes = await storageToBytes(dataStorage);
                            const filename = (
                              props as Record<string, any>
                            ).children[0].toString();
                            download(bytes, filename);
                          }
                        }}
                        {...props}
                      ></button>
                    );
                  },
                  img({ src, alt, width, height, ...props }) {
                    const isStorage = src.startsWith("STORAGE::");
                    return (
                      <AsyncImage
                        alt={alt}
                        src={
                          isStorage
                            ? storageToUrl(src.split("::")[1])
                            : (async () => src)()
                        }
                      />
                    );
                  },
                  iframe({ node, width, height, className, ...props }) {
                    return (
                      <iframe
                        className={`aspect-video w-[90%] mx-auto ${className} `}
                        {...props}
                      />
                    );
                  },
                  code({ inline, className, children, ...props }) {
                    const body = String(children).replace(/\n$/, "");
                    const classNameMatch = /language-(\w+)/.exec(
                      className || ""
                    );

                    if (inline || !classNameMatch) {
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
                    h1: (props) => <HeadingWithLink element="h1" {...props} />,
                    h2: (props) => <HeadingWithLink element="h2" {...props} />,
                    h3: (props) => <HeadingWithLink element="h3" {...props} />,
                    h4: (props) => <HeadingWithLink element="h4" {...props} />,
                    h5: (props) => <HeadingWithLink element="h5" {...props} />,
                    h6: (props) => <HeadingWithLink element="h6" {...props} />,
                    a: ({ children, href, target, ...props }) => {
                      let finalTarget: HTMLAttributeAnchorTarget = "_self";

                      const isRelative =
                        href.indexOf("http://") !== 0 &&
                        href.indexOf("https://") !== 0;

                      if (!isRelative) {
                        const url = new URL(href);
                        if (url.hostname !== server) finalTarget = "_blank";
                      }

                      return (
                        <a href={href} target={finalTarget} {...props}>
                          {children}
                        </a>
                      );
                    },
                  }}
                >
                  {body}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </CodeComponentManager>
    </>
  );
};

export default BlogViewer;
