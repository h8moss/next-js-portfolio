import type { NextApiRequest, NextApiResponse } from "next";

import { ImageLinkData, Project } from "../../types";

const generateGithubLink = (url: string): ImageLinkData => ({
  alt: "Github page",
  imageSource: "/social_icons/github.png",
  url: url,
});

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
      links: [
        generateGithubLink("https://github.com/h8moss/next-js-portfolio"),
      ],
    },
    {
      title: "Video game deal viewer",
      description:
        "This app, built with flutter, makes use of the cheapshark API to get the latest and best PC deals and displays them on a material UI",
      tags: ["Flutter", "Uses public API", "Android", "Ad-mob"],
      links: [
        {
          alt: "Google play page",
          imageSource: "/social_icons/playstore.png",
          url: "https://play.google.com/store/apps/details?id=com.h8m0ss.video_game_deal_viewer",
        },
        generateGithubLink("https://github.com/h8moss/video_game_deal_list"),
      ],
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
      links: [generateGithubLink("https://github.com/h8moss/flutter_chat_app")],
    },
    {
      title: "Flutter anime identifier",
      description:
        "A proof-of-concept app that allows the user to identify any anime frame screenshot using the trace.moe API",
      tags: ["Flutter", "Android", "Uses public API"],
      links: [generateGithubLink("https://github.com/h8moss/anime_identifier")],
    },
    {
      title: "handwritten number identifier",
      description:
        "One of the first projects I ever worked on, a simple python machine learning project which allows you to draw numbers and attempts to guess which digit it was",
      tags: ["python", "machine-learning", "tkinter"],
      links: [generateGithubLink("https://github.com/h8moss/Drawing-Numbers")],
    },
  ]);
}
