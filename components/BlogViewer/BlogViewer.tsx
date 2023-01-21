import { BsLink45Deg } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkHeadingID from "remark-heading-id";

import useToastText from "../../hooks/useToastText";
import { BlogPostData } from "../../types";
import Toast from "../Toast";
import styles from "./BlogViewer.module.css";
import CodeComponent from "./CodeComponent";
import CodeComponentManager from "./CodeComponent/CodeComponentManager";
import HeadingWithLink from "./HeadingWithLink/HeadingWithLink";
import { HTMLAttributeAnchorTarget } from "react";
import { server } from "../../config";

interface Props {
  post: BlogPostData;
}

const BlogViewer = ({ post: { body, tags, title } }: Props) => {
  const [toastProps, setToastText] = useToastText({
    props: {
      className: "bg-gray-500 text-white",
    },
  });

  return (
    <>
      <Toast {...toastProps} />
      <CodeComponentManager>
        <div className={styles.content}>
          <div>
            <h1 className="p-2 m-2">{title}</h1>
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkHeadingID]}
                rehypePlugins={[rehypeRaw]}
                components={{
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
                      return (
                        <code
                          className={`${className || ""} ${styles.inlineCode}`}
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
          </div>
        </div>
      </CodeComponentManager>
    </>
  );
};

export default BlogViewer;
