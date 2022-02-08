import { Children } from "react"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import style from './style.module.css';

const getChild = (children) => {
    let result = '';
    Children.forEach(children, child => {
        result += String(child);
    });

    return result;
}

const BlogViewer = ({ children, title, ...props }) => {
    let uniqueChild = getChild(children);
    return (
        <>
            <h1 className={style.title}>{title}</h1>
            <ReactMarkdown className={style.markdown}
                components={{
                    a({ children, ...props }) {
                        return <a {...props} target='_blank' rel="noreferrer">{children}</a>
                    },
                    code({ children, className, inline, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <div className="flex flex-col w-full">
                                <div className={style.precode} >
                                    <div className={style.btn1} /> <div className={style.btn2} /> <div className={style.btn3} />
                                </div>
                                <div className={style.code}>
                                    <SyntaxHighlighter
                                        customStyle={{ backgroundColor: 'transparent' }}
                                        language={match[1]}
                                        PreTag='div'
                                        style={materialDark}
                                        {...props}
                                    >
                                        {/* for some reason the match leaves a trailing newline */}
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        )
                            : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                    }
                }}
            >
                {uniqueChild}
            </ReactMarkdown>
        </>
    )
}

export default BlogViewer;