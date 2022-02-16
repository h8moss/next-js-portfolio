import { Project } from "../types";

const unique = <T>(arr: T[]): T[] =>
  arr.filter((val, index, array) => array.indexOf(val) === index);

export function getUniqueTags(projects: Project[]): string[] {
  let list = unique(
    projects.reduce<string[]>(
      (previous, current) => [...previous, ...current.tags],
      []
    )
  );

  list = list.sort();

  return list;
}

export function projectsWithTags(
  projects: Project[],
  tags: string[]
): number[] {
  let result: number[] = [];
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i];
    let allowed = true;
    for (let tag of tags) {
      if (!project.tags.includes(tag)) {
        allowed = false;
        break;
      }
    }
    if (allowed) result.push(i);
  }
  return result;
}
