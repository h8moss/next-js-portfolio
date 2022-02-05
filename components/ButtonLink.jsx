import style from '../styles/Components.module.css';
import { Image } from 'next/image';

export default function ButtonLink({ image, link, bg, alt, active = true, duration = 500, delay = 0, size }) {
    return (
        <a href={link} target='_blank' rel='noreferrer' className={style.buttonLink} style={{
            transform: `scaleX(${active ? 1 : 0})`,
            transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
        }}>
            <div className='rounded-lg' style={{ backgroundColor: bg }}>
                <Image alt={alt} src={image} className='m-3' style={{ width: `${size}px`, height: `${size}px` }} />
            </div>
        </a>
    );
}