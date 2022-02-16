import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useReducer, useState } from 'react';
import { FiX } from 'react-icons/fi';

import NavBar from "../components/NavBar";
import ScreenDiv from "../components/ScreenDiv";
import { server } from '../config';
import reducer from '../domain/portfolio/reducer';
import { EventType, State } from '../domain/portfolio/reducer/types';

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
            <NavBar />
            <ScreenDiv className='flex flex-row'>
                {shouldStay &&
                    <>
                        <AnimatePresence>
                            {state.showSelectedProject &&
                                <motion.div
                                    key={state.selectedProject.title}
                                    className='flex-1 overflow-clip bg-yellow-700 whitespace-nowrap'
                                    initial={{ flex: '0 0 0%' }}
                                    animate={{ flex: '1 1 0%' }}
                                    exit={{ flex: '0 0 0%' }}
                                >
                                    {state.selectedProject.title}
                                </motion.div>
                            }
                        </AnimatePresence>
                        <div className='flex flex-col flex-1 overflow-clip'>
                            <div className='flex overflow-auto w-full'>
                                {state.sortedTags.map((tag) => {
                                    let index = state.tags.indexOf(tag);

                                    let isVisible = state.visibleTags.includes(index);
                                    let isSelected = state.selectedTags.includes(index);

                                    return (

                                        <AnimatePresence key={tag}>
                                            {isVisible &&
                                                <div className='w-fit mx-1 my-2'>
                                                    <motion.button
                                                        layoutId={tag}
                                                        onClick={() => dispatch({ type: EventType.tagClicked, payload: index })}
                                                        whileHover={{
                                                            color: isSelected ? '#f00' : '#c8f',
                                                            backgroundColor: isSelected ? '#faa' : '#222',
                                                            scale: 1.1,
                                                        }}
                                                        initial={{
                                                            width: '0%',
                                                        }}
                                                        exit={{ opacity: 0 }}
                                                        animate={{ opacity: 1, width: '100%', backgroundColor: '#555' }}
                                                        className='rounded-lg p-2 text-sm flex-row flex whitespace-nowrap overflow-clip'
                                                    >
                                                        {isSelected && <FiX className='my-auto' />}
                                                        {tag}
                                                    </motion.button>
                                                </div>}
                                        </AnimatePresence>
                                    );
                                })}
                            </div>
                            <div className='bg-white flex-grow w-full flex flex-col'>
                                {state.projects.map((project, i) => {

                                    let isVisible = state.visibleProjects.includes(i)

                                    return (
                                        <AnimatePresence key={project.title}>
                                            {isVisible &&
                                                <motion.button
                                                    layoutId={project.title}

                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, scaleY: 1 }}
                                                    exit={{ scaleY: 0 }}

                                                    className='text-black py-5 border-b-2 border-gray-400'
                                                    onClick={() =>
                                                        dispatch({
                                                            type: EventType.projectClicked, payload: i
                                                        })}
                                                >
                                                    {project.title}
                                                </motion.button>
                                            }
                                        </AnimatePresence>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                }
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
