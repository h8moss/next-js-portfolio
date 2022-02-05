import type { NextApiRequest, NextApiResponse } from "next";

class Project {
  constructor({ title, description, tags = [] }) {
    this.title = title;
    this.description = description;
    this.tags = tags;
  }

  title: String;
  description: String;
  tags: String[];
}

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  res.status(200).json([
    new Project({
      title: "Portfolio website",
      description: "You are looking at it!",
      tags: ["React", "Next-js", "Tailwind", "Firebase-hosting"],
    }),
    new Project({
      title: "Video game deal viewer",
      description: "Some other description",
      tags: ["Flutter", "Uses public API", "Android", "Ad-mob"],
    }),
    new Project({
      title: "Flutter chat app",
      description: "My last description",
      tags: [
        "Flutter",
        "Firebase",
        "Firebase-hosting",
        "Multi-platform",
        "PWA",
        "CRUD",
      ],
    }),
  ]);
}
