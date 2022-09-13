import { darkTheme, mainTheme } from "../constants";
import { Theme } from "../types";
import useDarkMode from "./useDarkMode";

const useTheme = (): Theme => {
  const darkContext = useDarkMode();

  return darkContext.getValue() ? darkTheme : mainTheme;
};

export default useTheme;
