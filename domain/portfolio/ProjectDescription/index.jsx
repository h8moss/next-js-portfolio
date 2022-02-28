import style from './style.module.css';

const ProjectDescription = ({ project }) => {
    return (
        <>
            <h2 className={style.title}>
                {project.title}
            </h2>
            <div className={style.description}>
                <p>
                    {project.description}
                </p>
            </div>
        </>
    );
}

export default ProjectDescription;