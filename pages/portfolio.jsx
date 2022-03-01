import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';

import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import { server } from '../config';
import { ProjectList, ProjectView, TagList } from '../domain/portfolio';
import {
    ProjectView as MProjectView,
    TagFilter as MTagFilter
} from '../domain/portfolio/Mobile';
import reducer from '../domain/portfolio/reducer';
import EventType from '../domain/portfolio/reducer/eventType';
import State from '../domain/portfolio/reducer/state';

const Portfolio = ({ projects }) => {

    const [state, dispatch] = useReducer(reducer, new State({ projects: projects }))

    const router = useRouter();

    const [nextRoute, setNextRoute] = useState(router.pathname);

    const shouldStay = router.pathname === nextRoute;

    const [canExit, setCanExit] = useState([null, false]);

    useEffect(() => {
        setCanExit((canExit) => [!state.showSelectedProject, canExit[1]])
    }, [state.showSelectedProject])

    useEffect(() => {
        if (canExit[0] && canExit[1]) {
            router.push(nextRoute);
        }
    }, [canExit, nextRoute, router])

    return (
        <>
            <NavBar onClick={(route) => setNextRoute(route)} />
            <ScreenDiv className='flex flex-row'>
                <AnimatePresence
                    onExitComplete={() => setCanExit((state) => [true, state[1]])}
                >
                    {state.showSelectedProject && shouldStay &&
                        <>
                            <ProjectView
                                project={state.selectedProject}
                            />
                            <MProjectView
                                onExit={() => dispatch({ type: EventType.removeProjectSelection })}
                                project={state.selectedProject}
                            />
                        </>
                    }
                </AnimatePresence>
                <AnimatePresence
                    onExitComplete={() => setCanExit((state) => [state[0], true])}
                >
                    {shouldStay &&
                        <>
                            <div className='flex flex-col flex-1 overflow-clip'>
                                <TagList
                                    getIndex={(tag) => state.tags.indexOf(tag)}
                                    getSelected={(index) => state.selectedTags.includes(index)}
                                    getVisibility={(index) => state.visibleTags.includes(index)}
                                    onClick={(index) =>
                                        dispatch({ type: EventType.tagClicked, payload: index })
                                    }
                                    tags={state.sortedTags}
                                />
                                <MTagFilter
                                    getIndex={(tag) => state.tags.indexOf(tag)}
                                    getSelected={(index) => state.selectedTags.includes(index)}
                                    getVisibility={(index) => state.visibleTags.includes(index)}
                                    onClick={(index) =>
                                        dispatch({ type: EventType.tagClicked, payload: index })
                                    }
                                    tags={state.sortedTags}
                                />
                                <ProjectList
                                    onClick={(index) => dispatch({
                                        type: EventType.projectClicked,
                                        payload: index,
                                    })}
                                    projects={state.projects}
                                    isIndexVisible={(index) =>
                                        state.visibleProjects.includes(index)
                                    }
                                />

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
