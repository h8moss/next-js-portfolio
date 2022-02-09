import BlogViewer from "../../components/BlogViewer";
import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";

function Blog({ willExit, post: { title, text } }) {
    return (
        <div className="w-screen h-screen p-20">
            <div className="w-1/2 m-auto">
                <BlogViewer title={title}>
                    {text}
                </BlogViewer>
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