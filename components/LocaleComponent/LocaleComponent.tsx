import React from "react";

import useLocale from "../../hooks/useLocale";
import { I18n } from "../../types";

const LocaleComponent = (
  props: React.PropsWithChildren<I18n<React.ReactChild>>
) => {
  const locale = useLocale();

  if (props[locale]) return props[locale];

  return <>{props.children}</>;
};

export default LocaleComponent;
