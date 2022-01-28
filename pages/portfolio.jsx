import { server } from '../config';
import WithWillExit from '../components/WithWillExit';
import { useEffect, useState } from 'react';
import ProjectListTile from '../components/ProjectListTile';
import style from '../styles/Portfolio.module.css'

function Portfolio({ projects, willExit }) {

    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, [])

    let [selectedIndex, setSelectedIndex] = useState(null);
    const selectedProject = selectedIndex === null || willExit ? null : projects[selectedIndex];

    const projectComponents = projects.map((v, i) =>
        <ProjectListTile
            project={v}
            key={v.title}
            isSelected={selectedIndex === i}
            onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
        />
    );
    let showProjectView = selectedProject !== null;


    return (
        <div className="h-screen w-screen flex">
            <div className='flex-grow m-20 flex'>
                <div className={` flex-col transition-all flex mx-3 ${showProjectView ? 'flex-grow flex-1' : 'w-0'}`}>
                    <h2 className='text-2xl text-center my-2 min-h-[32px]'>{selectedProject?.title}</h2>
                    <div className={style.projectDescription}>
                        <div className={showProjectView ? style.active : style.inactive}>
                            <p>{selectedProject?.description}</p>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-1 flex-grow rounded-3xl transition-all bg-gray-300 shadow-xl duration-500 text-gray-800 overflow-clip" + ((!loaded || willExit) ? ' h-0 ' : ' h-full ')}
                >
                    {projectComponents}
                </div>
            </div>
        </div>
    );
}

export default (props) => {
    return (
        WithWillExit(Portfolio, props)
    );
}

export async function getStaticProps(context) {

    const res = await fetch(`${server}/api/projects`)
    const data = await res.json()

    return {
        props: { projects: data },
    }
}
