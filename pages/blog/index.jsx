import WithWillExit from "../../components/WithWillExit"
import { server } from "../../config";
import { dateFromSeconds, getAgoString } from "../../services/dateOperations";



function Blogs({ willExit, posts }) {
    // TODO: get a better font for the title
    const postComponents = posts.map(post => {

        const dateCreated = post.created !== undefined ? dateFromSeconds(post.created.seconds) : null;

        let tagComponents = post.tags.map(tag =>
            <a
                className="text-sm text-white bg-slate-700 p-1 m-1 rounded-lg border-4 border-transparent hover:border-slate-500"
                href={"/blog?tags=" + tag}
            >
                {tag}
            </a>
        )

        return (
            <a className="bg-white text-black flex flex-col mx-auto rounded-md shadow-2xl drop-shadow-lg p-3 w-full my-2 hover:scale-x-[1.02] transition-all group" key={post.id} href={`/blog/${post.id}`}>
                {dateCreated && <p className="text-sm text-gray-600">{`${dateCreated.toLocaleDateString()} (${getAgoString(dateCreated)})`}</p>}
                <h2 className="text-3xl transition-all group-hover:text-purple-400 whitespace-nowrap">{post.title}</h2>
                <div className="flex flex-row">{tagComponents}</div>
            </a>
        );
    });

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