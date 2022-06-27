import React from "react";

import useLocale from "../../hooks/useLocale";
import { I18n } from "../../types";

interface Props extends I18n<React.ReactChild> {}

const LocaleComponent = (props: React.PropsWithChildren<Props>) => {
  const locale = useLocale();

  if (props[locale]) return props[locale];

  return <>{props.children}</>;
};

export default LocaleComponent;
