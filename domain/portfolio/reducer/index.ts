import {
  getUniqueTags,
  projectsWithTags,
} from "../../../services/projectOperations";
import EventType from "./eventType";
import State from "./state";

const reducer = (state: State, event: { type: EventType; payload: any }) => {
  const projectClicked = (index: number) => {
    let newState = State.from(state);
    newState.selectedProjectIndex =
      state.selectedProjectIndex === index ? null : index;
    return newState;
  };

  const removeProjectSelectionEvent = () => {
    let newState = State.from(state);
    newState.selectedProjectIndex = null;
    return newState;
  };

  const tagClicked = (i: number) => {
    let newState = State.from(state);

    // remove tag
    if (newState.selectedTags.includes(i)) {
      let index = newState.selectedTags.indexOf(i);
      newState.selectedTags.splice(index, 1);
    }
    // add tag
    else {
      newState.selectedTags = [...state.selectedTags, i];
      if (
        newState.selectedProject &&
        !newState.selectedProject.tags.includes(newState.tags[i])
      ) {
        newState.selectedProjectIndex = null;
      }
    }

    if (newState.selectedTags.length === 0) {
      newState.visibleProjects = Array.from(
        Array(newState.projects.length).keys()
      );
    } else {
      newState.visibleProjects = projectsWithTags(
        newState.projects,
        newState.selectedTags.map((index) => newState.tags[index])
      );
    }

    newState.visibleTags = getUniqueTags(
      newState.visibleProjects.map((p) => newState.projects[p])
    ).map((tag) => newState.tags.indexOf(tag));

    return newState;
  };

  switch (event.type) {
    case EventType.projectClicked:
      return projectClicked(event.payload as number);

    case EventType.tagClicked:
      return tagClicked(event.payload as number);

    case EventType.removeProjectSelection:
      return removeProjectSelectionEvent();
  }
};

export default reducer;
