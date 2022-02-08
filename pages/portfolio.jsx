import { server } from '../config';
import WithWillExit from '../components/WithWillExit';
import ProjectListTile from '../domain/portfolo/ProjectListTile';
import style from '../styles/Portfolio.module.css'
import { tagState, useFilteredProjects } from '../hooks/useFilteredProjects';
import { FiX } from 'react-icons/fi';
import TagsList from '../domain/portfolo/TagsList';
import useLoading from '../hooks/useLoading';
import ScreenDiv from '../components/ScreenDiv';

function Portfolio({ projects, willExit }) {

    let loaded = useLoading(100);

    let projectsObject = useFilteredProjects(projects);

    let selectedProject = willExit ? null : projectsObject.selectedProject;
    const showProjectView = selectedProject !== null;

    const projectComponents = projectsObject.projects.map((v, i) =>

    (<ProjectListTile
        key={v.project.title}
        project={v.project}
        isSelected={v.isSelected}
        isVisible={v.visible}
        onClick={() => projectsObject.onProjectPressed(i)}
    />)
    );
    const tagsComponents = projectsObject.tags.map((tag) => {
        return (
            <button className={'transition-all duration-500 hover:bg-gray-700 bg-gray-600 text-white rounded-md flex flex-row text-sm ' + (tag.state === tagState.notVisible ? 'scale-0' : 'mx-2 my-auto')}
                key={tag.tag}
                onClick={() => projectsObject.onTagPressed(tag.index)}>
                {tag.state === tagState.selected && <FiX className='my-auto' />}
                {tag.state !== tagState.notVisible && <p className='m-1 whitespace-nowrap'>
                    {tag.tag}
                </p>}
            </button>
        );
    })

    return (
        <ScreenDiv className='flex'>
            <div className={`flex-col transition-all flex mx-3 ${showProjectView ? 'flex-grow flex-1' : 'w-0'}`}>
                <h2 className='text-2xl text-center my-2 min-h-[32px]'>{selectedProject?.title}</h2>
                <div className={style.projectDescription}>
                    <div className={showProjectView ? style.active : style.inactive}>
                        <p>{selectedProject?.description}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 flex-grow overflow-clip'>
                <TagsList show={!(willExit || !loaded)}>
                    {tagsComponents}
                </TagsList>
                <div className={"flex flex-col rounded-3xl transition-all bg-gray-300 shadow-xl duration-300 delay-300 text-gray-800 overflow-clip" + ((!loaded || willExit) ? ' h-0 ' : ' h-full flex-grow flex-1')}
                >
                    {projectComponents}
                </div>
            </div>
        </ScreenDiv>
    );
}

const willExit = (props) => WithWillExit(Portfolio, props)

export default willExit;

export async function getStaticProps(context) {

    const res = await fetch(`${server}/api/projects`)
    const data = await res.json()

    return {
        props: { projects: data },
    }
}
