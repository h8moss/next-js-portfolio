import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";


function Blog({ willExit, post }) {
    console.log(post);

    return (
        <div>

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

    const post = JSON.parse(await fetch(`${server}/api/blogs?id=${id}`));

    return {
        props: {
            post: post,
        }
    }
}

export async function getStaticPaths() {
    const posts = JSON.parse(await fetch(`${server}/api/blogs`))
    const ids = posts.map(post => post.id);
    const paths = ids.map(id => ({ params: { id: id } }));

    return {
        fallback: false,
        paths,
    }
}