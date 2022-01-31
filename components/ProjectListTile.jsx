export default function ProjectListTile({ project: { title, tags }, onClick, isSelected, isVisible }) {
    return (
        <button className={`overflow-clip flex-col flex w-full ${isSelected ? 'bg-stone-500' : ''} ${isVisible ? 'h-min border-gray-400 border-b-2' : 'h-0'}   w-full hover:bg-white transition-all duration-300 flex`} onClick={onClick}>
            {isVisible && [<p className='m-4'>
                {title}
            </p>,
            <div className="flex">
                {tags.map((tag) => <p className="bg-gray-600 rounded-md text-xs text-gray-300 ml-2 mb-1 p-1 whitespace-nowrap">{tag}</p>)}
            </div>
            ]}
        </button>
    );
}