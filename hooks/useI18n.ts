import { I18n } from "../types";
import useLocale from "./useLocale";

const useI18n = <T>(i18n: I18n<T>): T => {
  const locale = useLocale();

  return i18n[locale];
};

export default useI18n;
