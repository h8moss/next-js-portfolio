import style from './style.module.css'

export default function ProjectListTile({ project: { title, tags }, onClick, isSelected, isVisible }) {

    return (
        <button
            onClick={onClick}
            className={
                style.projectListTile + ' '
                + (isSelected ? style.pltSelected : '') + ' '
                + (isVisible ? style.pltVisible : style.pltInvisible)
            }>
            {isVisible && [<p className='m-4' key='title'>
                {title}
            </p>,
            <div className="flex" key='tags'>
                {tags.map((tag) => <p key={tag} className={style.tag}>{tag}</p>)}
            </div>
            ]}
        </button>
    );
}