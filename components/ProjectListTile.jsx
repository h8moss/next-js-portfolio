import style from '../styles/Components.module.css'

export default function ProjectListTile({ project: { title, tags }, onClick, isSelected, isVisible }) {

    return (
        <button
            onClick={onClick}
            className={
                style.projectListTile + ' '
                + (isSelected ? style.pltSelected : '') + ' '
                + (isVisible ? style.pltVisible : style.pltInvisible)
            }>
            {isVisible && [<p className='m-4'>
                {title}
            </p>,
            <div className="flex">
                {tags.map((tag) => <p className={style.tag}>{tag}</p>)}
            </div>
            ]}
        </button>
    );
}