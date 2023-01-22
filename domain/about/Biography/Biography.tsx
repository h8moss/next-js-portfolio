import { useRouter } from "next/router";
import { ReactNode } from "react";

import FlatButton from "../../../components/FlatButton";
import LocaleComponent from "../../../components/LocaleComponent";
import { ExtendedDateFormat } from "../../../services/dateOperations/types";
import { Locale } from "../../../types";
import BiographyEn from "./BiographyEn/BiographyEn";
import BiographyEs from "./BiographyEs/BiographyEs";

export interface Props {
  format: ExtendedDateFormat;
  displayDecimal: boolean;
}
const Biography = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <LocaleComponent
        en={<BiographyEn {...props} />}
        es={<BiographyEs {...props} />}
      >
        <p>
          This locale&apos;s Biography has not been implemented yet.
          <FlatButton
            onClick={() => router.push("/about", "/about", { locale: "en" })}
          >
            Read it in english?
          </FlatButton>
        </p>
      </LocaleComponent>
    </>
  );
};
export default Biography;
