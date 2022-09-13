import { motion } from "framer-motion";

import useDarkMode from "../../../../hooks/useDarkMode";
import useTailwindSize from "../../../../hooks/useTailwindSize";
import useTheme from "../../../../hooks/useTheme";

const DarkModeSwitch = () => {
  const darkMode = useDarkMode();

  const theme = useTheme();

  const { isLg } = useTailwindSize();

  const margin = isLg ? "my-auto" : "mx-auto";

  return (
    <button
      className={`flex flex-col text-center justify-center ${margin}`}
      onClick={darkMode.toggleValue}
    >
      {theme.toggleName} mode
      <div
        className={`w-10 p-1 flex h-min rounded-xl mx-auto ${theme.toggleBg}`}
      >
        <motion.div
          animate={{ width: darkMode.getValue() ? "50%" : "0%" }}
          className="h-4"
        />
        <div className={"w-4 h-4 rounded-lg " + theme.bgColorClass} />
      </div>
    </button>
  );
};

export default DarkModeSwitch;
