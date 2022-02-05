import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";
import ReactMarkdown from 'react-markdown'
import style from '../../styles/Blog.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'




function Blog({ willExit, post: { title, text } }) {
    return (
        <div className="w-screen h-screen p-20">
            <div className="w-1/2 m-auto">
                <h1 className={style.title}>{title}</h1>
                <ReactMarkdown className={style.markdown}
                    components={{
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
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default function willExit(props) {
    return (
        WithWillExit(Blog, props)
    );
}

export async function getStaticProps({ params }) {
    let id = params.id;

    const response = await fetch(`${server}/api/blogs?id=${id}`);
    const post = JSON.parse(await response.text());

    return {
        props: {
            post: post,
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${server}/api/blogs`);
    const posts = JSON.parse(await response.text())
    const ids = posts.map(post => post.id);
    const paths = ids.map(id => ({ params: { id: id } }));

    return {
        fallback: false,
        paths,
    }
}