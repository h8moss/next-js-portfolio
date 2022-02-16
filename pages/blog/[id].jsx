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
                        <motion.div className="w-1/2 m-auto"
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

export async function getStaticProps({ params }) {
    let id = params.id;

    const response = await fetch(`${server}/api/blogs?id=${id}`);
    const post = JSON.parse(await response.text());

    return {
        props: {
            post: post,
        }
    }
}

export async function getStaticPaths() {
    const response = await fetch(`${server}/api/blogs`);
    const posts = JSON.parse(await response.text())
    const ids = posts.map(post => post.id);
    const paths = ids.map(id => ({ params: { id: id } }));

    return {
        fallback: false,
        paths,
    }
}