import { getAgoString } from "../../../../services/dateOperations";

const ProjectTile = ({ id, dateCreated, title, tags }) => {

    const agoString = dateCreated !== null
        ? getAgoString(dateCreated)
        : null;

    // TODO: get a better font for the title
    return (
        <a
            className="bg-white text-black flex flex-col 
                mx-auto rounded-md shadow-2xl drop-shadow-lg 
                p-3 w-full my-2 hover:scale-x-[1.02] transition-all group"
            href={`/blog/${id}`}
        >
            {dateCreated &&
                <p className="text-sm text-gray-600">
                    {`${dateCreated.toLocaleDateString()} (${agoString})`}
                </p>
            }
            <h2
                className="text-3xl transition-all 
                    group-hover:text-purple-400 whitespace-nowrap"
            >
                {title}
            </h2>
            <div className="flex flex-row">
                {tags}
            </div>
        </a>
    );
}

export default ProjectTile;