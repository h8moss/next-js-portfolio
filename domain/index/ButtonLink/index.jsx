import Image from 'next/image';

import style from './style.module.css';

export default function ButtonLink({ image, link, bg, alt, active = true, duration = 500, delay = 0, size }) {
    return (
        <a href={link} target='_blank' rel='noreferrer' className={style.buttonLink} style={{
            transform: `scaleX(${active ? 1 : 0})`,
            transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
        }}>
            <div className='rounded-lg p-5' style={{ backgroundColor: bg }}>
                <Image alt={alt} src={image} className='m-3' width={size} height={size} />
            </div>
        </a>
    );
}