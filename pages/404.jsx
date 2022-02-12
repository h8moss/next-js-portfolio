import { useRouter } from 'next/router';

import NavBar from "../components/NavBar";
import ParticleText from "../domain/404/ParticleText";

export default function Four0Four() {

    let router = useRouter();

    return (
        <>
            <NavBar onClick={(route) => router.push(route)} />
            <div className="overflow-hidden flex-col text-center justify-center">
                <ParticleText className='w-full h-full' text='404' />
                <div className="absolute bottom-20 w-full">
                    <h2 className="text-3xl  text-center mx-auto">Are you lost?</h2>
                </div>
            </div>
        </>
    );
}