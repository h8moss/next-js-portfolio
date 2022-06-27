import { useRouter } from "next/router";

import { Locale } from "../types";

const useLocale = (): Locale => {
  const router = useRouter();

  return router.locale as Locale;
};

export default useLocale;
