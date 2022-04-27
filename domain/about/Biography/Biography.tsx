import { PropsWithChildren, ReactNode } from "react";

import useLocale from "../../../hooks/useLocale";
import { ExtendedDateFormat } from "../../../services/dateOperations/types";
import { Locale } from "../../../types";
import BiographyEn from "./BiographyEn/BiographyEn";
import BiographyEs from "./BiographyEs/BiographyEs";

export interface Props {
  format: ExtendedDateFormat;
  displayDecimal: boolean;
}

const getLocaleBiography = (locale: Locale, props: Props): ReactNode => {
  switch (locale) {
    case "en":
      return <BiographyEn {...props} />;
    case "es":
      return <BiographyEs {...props} />;
    default:
      return "UNIMPLEMENTED LOCALE, PLEASE CONTACT DEVELOPER";
  }
};

const Biography = (props: Props) => {
  const locale = useLocale();

  return <>{getLocaleBiography(locale, props)}</>;
};
export default Biography;
