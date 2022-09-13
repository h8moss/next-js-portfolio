import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsEmojiNeutral } from 'react-icons/bs';

import Card from '../../components/Card';
import NavBar from '../../components/NavBar';
import { getBlogs } from '../../domain/blog/api';
import i18n from '../../domain/blog/i18n';
import { BlogListTile, Tag } from '../../domain/blog/index';
import useI18n from '../../hooks/useI18n';
import { dateFromSeconds } from "../../services/dateOperations";

function Blogs({ posts }) {

    const router = useRouter()
    const [nextRoute, setNextRoute] = useState(router.pathname);

    const shouldStay = nextRoute === router.pathname;
    const { noBlogText } = useI18n(i18n);

    const { indexTitle } = useI18n(i18n);

    const postComponents = posts.map(post => {

        const dateCreated = post.created !== undefined
            ? dateFromSeconds(post.created.seconds)
            : null;

        let tagComponents = post.tags.map(tag => <Tag text={tag} key={tag} />);

        return (
            <BlogListTile
                key={post.id}
                dateCreated={dateCreated}
                tags={tagComponents}
                title={post.title}
                onClick={() => setNextRoute(`blog/${post.id}`)}
            />
        );
    });

    return (
        <>
            <Head>
                <title>{indexTitle}</title>
            </Head>
            <div className='h-screen'>
                <NavBar
                    onClick={(route) => setNextRoute(route)}
                />
                <AnimatePresence
                    onExitComplete={() => router.push(nextRoute)}>
                    {shouldStay &&
                        <Card>
                            {
                                postComponents == null || postComponents.length == 0
                                    ? <div className='justify-center text-center text-3xl flex flex-col'>
                                        {noBlogText}
                                        <BsEmojiNeutral className='mx-auto mt-4' size={50} />
                                    </div>
                                    : postComponents
                            }
                        </Card>}
                </AnimatePresence>
            </div>
        </>
    )
}

export default Blogs;

export async function getStaticProps({ locale }) {

    const blogs = await getBlogs({ language: locale })
    return {
        props: {
            posts: blogs,
        }
    }
}