import { motion } from 'framer-motion';
import Image from 'next/image';

import useLocale from '../../../hooks/useLocale';
import style from './style.module.css';

const ProjectDescription = ({ project }) => {

    const locale = useLocale();

    const links = project.links ?? [];
    let { title, description } = project;
    title = title[locale];
    description = description[locale]

    return (
        <>
            <h2 className={style.title}>
                {title}
            </h2>
            <div className={style.description}>
                <p>
                    {description}
                </p>
                <div className="flex flex-row my-3">
                    {links.map((link) =>
                        <motion.a
                            href={link.url}
                            rel='noreferrer'
                            target='_blank'
                            key={link.url}
                            className="bg-white p-1 rounded-lg mx-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Image
                                alt={link.alt}
                                src={link.imageSource}
                                width='48'
                                height='48'
                            />
                        </motion.a>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProjectDescription;