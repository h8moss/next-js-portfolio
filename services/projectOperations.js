const unique = (arr) => arr.filter((val, index, array) => array.indexOf(val) === index);

export function getUniqueTags(projects) {
    return unique(projects.reduce(
        (previous, current) => [...previous, ...current.tags],
        []
    ));
}

export function projectsWithTags(projects, tags) {
    return projects.filter((project) =>
        project.tags.some((tag) =>
            tags.some((tag2) =>
                tag2 === tag
            )
        )
    )
}