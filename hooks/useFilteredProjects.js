import { useState } from "react";
import { getUniqueTags, projectsWithTags } from "../services/projectOperations";

const tagState = {
    selected: 'selected',
    unselected: 'unselected',
    notVisible: 'not_visible',
}

const sortTags = (tags) => {
    let result = [];
    for (let tag of tags) {
        if (tag.state === tagState.selected) {
            result.push(tag);
        }
    }

    for (let tag of tags) {
        if (tag.state !== tagState.selected) {
            result.push(tag);
        }
    }

    return result;
}

export { tagState };

export function useFilteredProjects(projects) {

    let [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
    let selectedProject = selectedProjectIndex !== null
        ? projects[selectedProjectIndex]
        : null;
    let [visibleProjects, setVisibleProjects] = useState(projects.map((_, i) => i));

    let allTags = getUniqueTags(projects);
    let [selectedTags, setSelectedTags] = useState([]);
    let visibleTags = getUniqueTags(visibleProjects.map((index) => projects[index]));

    let projectObjects = projects.map((project, index) => ({
        project: project,
        visible: visibleProjects.includes(index),
        isSelected: index == selectedProject,
    }));
    let tags = allTags.map((tag, index) => ({
        tag: tag,
        state: selectedTags.includes(index)
            ? tagState.selected
            : (visibleTags.includes(tag)
                ? tagState.unselected
                : tagState.notVisible),
        index: index,
    }));
    tags = sortTags(tags);

    const onProjectPressed = (projectIndex) => {
        setSelectedProjectIndex(
            projectIndex === selectedProjectIndex
                ? null
                : projectIndex
        )
    }

    const _updateTags = (newTags) => {
        if (selectedTags !== newTags) {
            if (newTags.length === 0)
                setVisibleProjects(projects.map((_, i) => i));
            else
                setVisibleProjects(projectsWithTags(projects, newTags.map((v) => tags[v].tag)).map((p) => projects.indexOf(p)))
            setSelectedTags(newTags);
        }
    }

    const onTagPressed = (tagIndex) => {
        let currentSelected = [...selectedTags]
        if (currentSelected.includes(tagIndex)) {
            currentSelected.splice(currentSelected.indexOf(tagIndex), 1)
        } else {
            if (selectedProject !== null && !selectedProject.tags.includes(tags[tagIndex].tag)) {
                setSelectedProjectIndex(null);
            }
            currentSelected.push(tagIndex);
        }
        _updateTags(currentSelected);
    }

    return {
        selectedProject: selectedProject,
        tags: tags,
        projects: projectObjects,
        onTagPressed: onTagPressed,
        onProjectPressed: onProjectPressed,
        clearProjects: () => setSelectedProjectIndex(null),
        clearTags: () => _updateTags([]),
    }
}