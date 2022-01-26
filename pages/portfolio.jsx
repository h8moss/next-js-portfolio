import { server } from '../config';

export default function Portfolio({ projects }) {

    const projectComponents = projects.map((v) =>
        <button className='border-b-2 border-gray-400 h-min w-full hover:bg-white transition-all flex'>
            <p className='m-4'>
                {v.title}
            </p>
        </button>
    );

    return (
        <div className="h-screen w-screen flex">
            <div className="flex m-20 flex-grow rounded-3xl bg-gray-300 shadow-xl text-gray-800 overflow-clip">
                {projectComponents}
            </div>
        </div>
    );
}

export async function getStaticProps(context) {

    const res = await fetch(`${server}/api/projects`)
    const data = await res.json()

    return {
        props: { projects: data },
    }
}
