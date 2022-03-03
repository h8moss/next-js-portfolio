import useI18n from '../../../hooks/useI18n';
import i18n from '../i18n';
import TextStreamWriter from "./TextWriter";

const MainTextWriter = ({ onDone }) => {

    const { lookAtSocials, description } = useI18n(i18n);
    const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10] = description;

    return (
        <>
            <TextStreamWriter delay={40} onDone={onDone}>
                {d1}
                <span className='font-bold text-blue-500'>{d2}</span>
                {d3}
                <span className='font-bold text-red-500'>{d4}</span>
                {d5}
                <span className='font-bold text-purple-500'>{d6}</span>
                {d7}
                <span className='font-bold text-yellow-400'>{d8}</span>
                {d9}
                <span className='font-bold text-green-500'>{d10}</span>
                <br />
                {lookAtSocials}
            </TextStreamWriter>
        </>
    );
}

export default MainTextWriter;