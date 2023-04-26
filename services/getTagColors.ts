import { m } from "framer-motion";

type TagColors = {
  main: string;
  secondary: string;
};

const firebaseColors = {
  main: "white",
  secondary: "#FECB2F",
};

const svelteColors = {
  main: "white",
  secondary: "#FF3E00",
};

const tagColors: Record<string, TagColors> = {
  "next js": {
    main: "white",
    secondary: "black",
  },
  react: {
    secondary: "#20232A",
    main: "#61DAFB",
  },
  javascript: {
    main: "#323230",
    secondary: "#EAD64C",
  },
  flutter: {
    main: "white",
    secondary: "#206FD4",
  },
  firebase: firebaseColors,
  "firebase firestore": firebaseColors,
  "firebase-hosting": firebaseColors,

  python: {
    main: "#FFD03C",
    secondary: "#3473A4",
  },

  svelte: svelteColors,
  sveltekit: svelteColors,

  "c++": {
    main: "white",
    secondary: "#00549E",
  },
};

const getTagColors = (tag: string): TagColors | null => {
  if (tagColors[tag.toLowerCase()]) return tagColors[tag.toLowerCase()];

  return null;
};

export default getTagColors;
