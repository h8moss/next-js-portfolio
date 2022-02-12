const Tag = ({ text }) => {
    return (
        <a
            className="text-sm text-white bg-slate-700 
            p-1 m-1 rounded-lg border-4 border-transparent 
            hover:border-slate-500"

            href={"/blog?tags=" + text}
        >
            {text}
        </a>
    );
}

export default Tag;