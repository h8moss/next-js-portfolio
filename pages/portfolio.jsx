import { server } from '../config';

export default function Portfolio({ projects }) {

    const projectComponents = projects.map((v) => <div>{v.title}</div>);

    return (
        <div className="h-screen w-screen flex">
            <div className="flex m-20 flex-grow rounded-3xl bg-gray-300 shadow-xl">
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
