import { ImageLinkData, Project } from "../../../types";

const generateGithubLink = (url: string): ImageLinkData => ({
  alt: "Github page",
  imageSource: "/social_icons/github.png",
  url: url,
});

const getProjects = (): Project[] => {
  return [
    {
      title: {
        en: "Portfolio website",
        es: "Sitio web personal",
      },
      description: {
        en: "You are looking at it! I taught myself react in order to build this website and I am quite proud of it",
        es: "Lo estas viendo! Aprendí React y Next.js con el propósito de diseñar este sitio web, me siento orgulloso de como quedó",
      },
      tags: [
        "Next js",
        "React",
        "Javascript",
        "Firebase firestore",
        "Vercel-hosting",
        "web",
      ],
      links: [
        generateGithubLink("https://github.com/h8moss/next-js-portfolio"),
      ],
    },
    {
      title: {
        en: "Video game deal viewer",
        es: "Video game deal viewer",
      },
      description: {
        en: "This app, built with flutter, makes use of the cheapshark API to get the latest and best PC deals and displays them on a material UI",
        es: "Una aplicación para android escrita en Flutter, utiliza la API de cheapshark para encontrar los mejores descuentos en juegos de PC y los muestra en una lista",
      },
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
      title: {
        en: "Flutter chat app",
        es: "Chat app Flutter",
      },
      description: {
        en: "A chat app built with flutter to showcase the capabilities of firebase and flutter for web.",
        es: "Esta aplicación, creada con Flutter, permite al usuario enviar mensajes en un chat grupal con todos los demás usuarios, utiliza firebase como el back-end",
      },
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
      title: {
        en: "Flutter anime identifier",
        es: "Identificador de Anime Flutter",
      },
      description: {
        en: "A proof-of-concept app that allows the user to identify any anime frame screenshot using the trace.moe API",
        es: "Simple aplicación que le permite al usuario identificar cualquier captura de pantalla de un anime utilizando la API de trace.moe",
      },
      tags: ["Flutter", "Android", "Uses public API"],
      links: [generateGithubLink("https://github.com/h8moss/anime_identifier")],
    },
    {
      title: {
        en: "Handwritten number identifier",
        es: "Identificador de números a mano",
      },
      description: {
        en: "One of the first projects I ever worked on, a simple python machine learning project which allows you to draw numbers and attempts to guess which digit it was",
        es: "Uno de los primeros proyectos en los que trabajé, escrito en python, utiliza una red neuronal de inteligencia artificial para identificar los números dibujados en un canvas",
      },
      tags: ["python", "machine-learning", "tkinter"],
      links: [generateGithubLink("https://github.com/h8moss/Drawing-Numbers")],
    },
    {
      title: {
        en: "website update notifier",
        es: "notificador de cambios en sitio web",
      },
      description: {
        en: "A simple python program that compares a cached version of a website with the live version and sends an email when they change",
        es: "Una aplicación de python sencilla que compara una versión guardada de un sitio web con la versión actual y envía un mail si difieren",
      },
      tags: ["python"],
      links: [generateGithubLink("https://github.com/h8moss/website_updates")],
    },
  ];
};

export default getProjects;
