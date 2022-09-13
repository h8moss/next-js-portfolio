import { useContext } from "react";

import darkModeContext from "../context/darkMode";

const useDarkMode = () => {
  return useContext(darkModeContext);
};

export default useDarkMode;
