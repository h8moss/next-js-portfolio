import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../types";

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  res.status(200).json([
    {
      title: "Portfolio website",
      description: "You are looking at it!",
      tags: ["React", "Next-js", "Tailwind", "Firebase-hosting"],
    },
    {
      title: "Video game deal viewer",
      description: "Some other description",
      tags: ["Flutter", "Uses public API", "Android", "Ad-mob"],
    },
    {
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
    },
  ]);
}
