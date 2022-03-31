import Head from 'next/head';
import { useRouter } from 'next/router';

import NavBar from "../components/NavBar";
import { i18n, ParticleText } from "../domain/404";
import useI18n from '../hooks/useI18n';
import useTailwindSize from '../hooks/useTailwindSize';

export default function Four0Four() {

    let router = useRouter();
    const { isLg } = useTailwindSize();

    const { message } = useI18n(i18n)

    return (
        <>
            <Head>
                <title> 404 </title>
            </Head>
            <NavBar onClick={(route) => router.push(route)} />
            <div className="overflow-hidden flex-col text-center justify-center">
                {isLg
                    ? <ParticleText className='w-full h-full' text='404' />
                    : <h1>
                        404
                    </h1>
                }
                <div className="absolute bottom-20 w-full">
                    <h2 className="text-3xl  text-center mx-auto">{message}</h2>
                </div>
            </div>
        </>
    );
}