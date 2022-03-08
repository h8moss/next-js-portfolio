import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BlogViewer from "../../components/BlogViewer";
import NavBar from "../../components/NavBar";
import ScreenDiv from '../../components/ScreenDiv';
import { server } from "../../config";

function Blog({ post: { title, text } }) {

    const router = useRouter();
    const [nextRoute, setNextRoute] = useState(router.pathname);


    const shouldStay = nextRoute === router.pathname;

    return (
        <>
            <NavBar onClick={(route) => setNextRoute(route)} />
            <ScreenDiv>
                <AnimatePresence
                    onExitComplete={() => router.push(nextRoute)}
                >
                    {shouldStay &&
                        <motion.div className="md:w-1/2 w-[95%] m-auto mt-10"
                            initial={{
                                x: '100vw',
                            }}
                            animate={{
                                x: '0',
                            }}
                            exit={{
                                x: '-100vw',
                            }}
                        >
                            <BlogViewer title={title}>
                                {text}
                            </BlogViewer>
                        </motion.div>
                    }
                </AnimatePresence>
            </ScreenDiv>
        </>
    )
}

export default Blog;

export async function getStaticProps({ params, locale }) {
    let id = params.id;

    const response = await fetch(`${server}/api/blogs?id=${id}&lang=${locale}`);
    const post = JSON.parse(await response.text());

    return {
        props: {
            post: post,
        }
    }
}

export async function getStaticPaths({ locales }) {

    let paths = [];

    for (let locale of locales) {
        const response = await fetch(`${server}/api/blogs?lang=${locale}`);
        const posts = JSON.parse(await response.text())
        const ids = posts.map(post => post.id);
        paths = [...paths, ...ids.map(id => ({ params: { id: id }, locale: locale }))];
    }

    return {
        fallback: false,
        paths,
    }
}