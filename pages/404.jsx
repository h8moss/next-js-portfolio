import NavBar from "../components/NavBar";
import ParticleText from "../components/ParticleText";

export default function Four0Four() {
    return (
        <div>
            <NavBar />
            <div className="overflow-hidden flex-col text-center justify-center">
                <ParticleText className='m-auto w-1/2' />
                <h2 className="text-3xl">Are you lost?</h2>
            </div>
        </div>
    );
}