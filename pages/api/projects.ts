import type { NextApiRequest, NextApiResponse } from "next";

import { Project } from "../../types";

export default function handle(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  res.status(200).json([
    {
      title: "Portfolio website",
      description:
        "You are looking at it! I taught myself react in order to build this website and I am quite proud of it",
      tags: [
        "Next js",
        "React",
        "Javascript",
        "Firebase",
        "Firebase-hosting",
        "web",
      ],
    },
    {
      title: "Video game deal viewer",
      description:
        "This app, built with flutter, makes use of the cheapshark API to get the latest and best PC deals and displays them on a material UI",
      tags: ["Flutter", "Uses public API", "Android", "Ad-mob"],
    },
    {
      title: "Flutter chat app",
      description:
        "A chat app built with flutter to showcase the capabilities of firebase and flutter for web.",
      tags: [
        "Flutter",
        "Firebase",
        "Firebase-hosting",
        "Multi-platform",
        "PWA",
        "CRUD",
        "web",
      ],
    },
    {
      title: "Flutter anime identifier",
      description:
        "A proof-of-concept app that allows the user to identify any anime frame screenshot using the trace.moe API",
      tags: ["Flutter", "Android", "Uses public API"],
    },
  ]);
}
