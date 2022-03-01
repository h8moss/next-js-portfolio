import { useRouter } from 'next/router';

import NavBar from "../components/NavBar";
import ParticleText from "../domain/404/ParticleText";
import useTailwindSize from '../hooks/useTailwindSize';

export default function Four0Four() {

    let router = useRouter();
    const { isMd } = useTailwindSize();

    return (
        <>
            <NavBar onClick={(route) => router.push(route)} />
            <div className="overflow-hidden flex-col text-center justify-center">
                {isMd
                    ? <ParticleText className='w-full h-full' text='404' />
                    : <h1 className='text-9xl mt-48'>
                        404
                    </h1>
                }
                <div className="absolute bottom-20 w-full">
                    <h2 className="text-3xl  text-center mx-auto">Are you lost?</h2>
                </div>
            </div>
        </>
    );
}