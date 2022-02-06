import { Project } from "../types";

const unique = <T>(arr: T[]): T[] =>
  arr.filter((val, index, array) => array.indexOf(val) === index);

export function getUniqueTags(projects: Project[]): String[] {
  return unique(
    projects.reduce<String[]>(
      (previous, current) => [...previous, ...current.tags],
      []
    )
  );
}

export function projectsWithTags(
  projects: Project[],
  tags: String[]
): Project[] {
  let result: Project[] = [];
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
  return result;
}
