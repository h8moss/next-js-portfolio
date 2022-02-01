import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";

function Blogs({ willExit, posts }) {
    console.log(posts);
    // TODO: get a better font for the title
    const postComponents = posts.map(post => (
        <a className="bg-white text-black flex flex-col mx-auto rounded-md shadow-2xl drop-shadow-lg p-3 w-full my-2 hover:scale-x-[1.02] transition-all" key={post.id} href={`/blog/${post.id}`}>
            <h2 className="text-3xl transition-all hover:text-purple-400 whitespace-nowrap">{post.title}</h2>
        </a>
    ));

    return (
        <div className="w-screen h-screen p-20">
            <div className="flex flex-col bg-slate-200 p-7 w-[70%] mx-auto rounded-lg h-full overflow-clip">
                {postComponents}
            </div>
        </div>
    )
}

export default props => WithWillExit(Blogs, props)


export async function getStaticProps() {
    const response = await fetch(`${server}/api/blogs`);
    const posts = JSON.parse(await response.text());

    return {
        props: {
            posts: posts,
        }
    }
}