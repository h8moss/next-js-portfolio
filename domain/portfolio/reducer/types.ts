import { throws } from "assert";
import { getUniqueTags } from "../../../services/projectOperations";
import { Project } from "../../../types";

export class State {
  constructor({ projects }: { projects: Project[] }) {
    const allTags = getUniqueTags(projects);

    this.projects = projects;
    this.visibleProjects = Array.from(Array(projects.length).keys());

    this.tags = allTags;
    this.selectedTags = [];
    this.visibleTags = Array.from(Array(this.tags.length).keys());

    this.selectedProjectIndex = null;
  }

  static from(original: State): State {
    let result = new State({ projects: [] });

    result.projects = [...original.projects];
    result.selectedProjectIndex = original.selectedProjectIndex;
    result.selectedTags = [...original.selectedTags];
    result.tags = [...original.tags];
    result.visibleProjects = [...original.visibleProjects];
    result.visibleTags = [...original.visibleTags];

    return result;
  }

  visibleProjects: number[];
  projects: Project[];

  tags: string[];
  selectedTags: number[];
  visibleTags: number[];

  selectedProjectIndex: number;

  get selectedProject() {
    return this.projects[this.selectedProjectIndex];
  }

  get showSelectedProject() {
    return this.selectedProjectIndex !== null;
  }

  get sortedTags() {
    let selected: string[] = [];
    let unselected: string[] = [];
    let invisible: string[] = [];

    for (let i = 0; i < this.tags.length; i++) {
      if (this.visibleTags.includes(i)) {
        if (this.selectedTags.includes(i)) {
          selected.push(this.tags[i]);
        } else {
          unselected.push(this.tags[i]);
        }
      } else {
        invisible.push(this.tags[i]);
      }
    }

    return [...selected, ...unselected, ...invisible];
  }
}

const a = () => {
  let x = new State({ projects: [] });
};

export enum EventType {
  projectClicked,
  tagClicked,
}
