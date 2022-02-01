import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";


function Blog({ willExit, post: { title, } }) {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default (props) => {
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