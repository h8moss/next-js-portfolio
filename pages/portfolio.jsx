import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useReducer, useState } from 'react';

import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import { server } from '../config';
import ProjectListTile from '../domain/portfolio/ProjectListTile';
import ProjectView from '../domain/portfolio/ProjectView';
import reducer from '../domain/portfolio/reducer';
import EventType from '../domain/portfolio/reducer/eventType';
import State from '../domain/portfolio/reducer/state';
import TagList from '../domain/portfolio/TagList';
import TagButton from '../domain/portfolio/TagList/TagButton';

const initialState = {
    allTags: [],
    selectedTags: [],
}

const Portfolio = ({ projects }) => {

    const [state, dispatch] = useReducer(reducer, new State({ projects: projects }))

    const router = useRouter();

    const [nextRoute, setNextRoute] = useState(router.pathname);

    const shouldStay = router.pathname === nextRoute;

    return (
        <>
            <NavBar onClick={(route) => setNextRoute(route)} />
            <ScreenDiv className='flex flex-row'>
                <AnimatePresence>
                    {shouldStay &&
                        <>
                            <AnimatePresence>
                                {state.showSelectedProject &&
                                    <ProjectView
                                        project={state.selectedProject}
                                    />
                                }
                            </AnimatePresence>
                            <div className='flex flex-col flex-1 overflow-clip'>
                                <TagList
                                    getIndex={(tag) => state.tags.indexOf(tag)}
                                    getSelected={(index) => state.selectedTags.includes(index)}
                                    getVisibility={(index) => state.visibleTags.includes(index)}
                                    onClick={(index) => dispatch({ type: EventType.tagClicked, payload: index })}
                                    tags={state.sortedTags}
                                />
                                <div className='bg-white flex-grow w-full flex flex-col'>
                                    {state.projects.map((project, i) => {

                                        let isVisible = state.visibleProjects.includes(i)

                                        return (
                                            <AnimatePresence key={project.title}>
                                                {isVisible &&
                                                    <ProjectListTile
                                                        project={project}
                                                        onClick={() =>
                                                            dispatch({
                                                                type: EventType.projectClicked,
                                                                payload: i
                                                            })}
                                                    />
                                                }
                                            </AnimatePresence>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    }
                </AnimatePresence>
            </ScreenDiv>
        </>
    );
}

export default Portfolio;

export async function getStaticProps() {

    const res = await fetch(`${server}/api/projects`)
    const data = await res.json()

    return {
        props: { projects: data },
    }
}
