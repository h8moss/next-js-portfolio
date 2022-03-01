import TextStreamWriter from "./TextWriter";

const MainTextWriter = ({ onDone }) => {

    return (
        <>
            <TextStreamWriter delay={40} onDone={onDone}>
                I am a software developer with skills in
                <span className='font-bold text-blue-500'> Flutter</span>
                ,
                <span className='font-bold text-red-500'> Python</span>
                ,
                <span className='font-bold text-purple-500'> C++</span>
                ,
                <span className='font-bold text-yellow-400'> Javascript </span>
                and
                <span className='font-bold text-green-500'> more</span>
                <br />
                Please take a look at my socials!
            </TextStreamWriter>
        </>
    );
}

export default MainTextWriter;