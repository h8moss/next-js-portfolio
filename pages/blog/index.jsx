import { useRouter } from 'next/router';
import { useState } from 'react';

import Card from '../../components/Card';
import NavBar from '../../components/NavBar';
import ScreenDiv from '../../components/ScreenDiv';
import { server } from "../../config";
import ProjectTile from '../../domain/blog/index/ProjectTile';
import Tag from '../../domain/blog/index/Tag';
import { dateFromSeconds } from "../../services/dateOperations";



function Blogs({ posts }) {

    let router = useRouter()
    let [nextRoute, setNextRoute] = useState(router.pathname);

    let shouldStay = nextRoute === router.pathname;

    const postComponents = posts.map(post => {

        const dateCreated = post.created !== undefined
            ? dateFromSeconds(post.created.seconds)
            : null;

        let tagComponents = post.tags.map(tag => <Tag text={tag} key='tag' />);

        return (
            <ProjectTile
                key={post.id}
                dateCreated={dateCreated}
                id={post.id}
                tags={tagComponents}
                title={post.title}
            />
        );
    });

    return (
        <>
            <NavBar
                onClick={(route) => setNextRoute(route)}
            />
            <ScreenDiv>
                <Card
                    onExit={() => router.push(nextRoute)}
                    show={shouldStay}
                >
                    {postComponents}
                </Card>
            </ScreenDiv>
        </>
    )
}

export default Blogs;

export async function getStaticProps() {
    const response = await fetch(`${server}/api/blogs`);
    const posts = JSON.parse(await response.text());

    return {
        props: {
            posts: posts,
        }
    }
}