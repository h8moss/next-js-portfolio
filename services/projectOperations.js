const unique = (arr) => arr.filter((val, index, array) => array.indexOf(val) === index);

export function getUniqueTags(projects) {
    return unique(projects.reduce(
        (previous, current) => [...previous, ...current.tags],
        []
    ));
}

export function projectsWithTags(projects, tags) {
    let result = [];
    for (let project of projects) {
        let allowed = true;
        for (let tag of tags) {
            if (!project.tags.includes(tag)) {
                allowed = false;
                break;
            }
        }
        if (allowed) result.push(project);
    }
    if (result.length !== 3)
        console.log(result);
    return result;
}