import { PropsWithChildren, useState } from "react";

import darkModeContext from "../../context/darkMode";

const DarkModeProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const [darkMode, setDarkMode] = useState(false);

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
