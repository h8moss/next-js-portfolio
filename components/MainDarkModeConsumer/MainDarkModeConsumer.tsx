import { PropsWithChildren } from "react";

import useTheme from "../../hooks/useTheme";

const MainDarkModeConsumer = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const theme = useTheme();

  return <div className={theme.bodyClass}>{children}</div>;
};

export default MainDarkModeConsumer;
