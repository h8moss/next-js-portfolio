export default function ProjectListTile({ project: { title }, onClick, isSelected }) {
    return (
        <button className={`border-b-2 ${isSelected ? 'bg-stone-500' : ''} border-gray-400 h-min w-full hover:bg-white transition-all flex`} onClick={onClick}>
            <p className='m-4'>
                {title}
            </p>
        </button>
    );
}