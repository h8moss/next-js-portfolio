import { PropsWithChildren, useEffect, useState } from "react";

import darkModeContext from "../../context/darkMode";

const DarkModeProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDarkMode(!!localStorage.getItem("DARK-MODE"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("DARK-MODE", darkMode ? "TRUE" : "");
    }
  }, [darkMode]);

  return (
    <darkModeContext.Provider
      value={{
        setValue: setDarkMode,
        toggleValue: () => setDarkMode((v) => !v),
        getValue: () => darkMode,
      }}
    >
      {children}
    </darkModeContext.Provider>
  );
};

export default DarkModeProvider;
