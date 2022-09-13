import { createContext } from "react";

import { DarkModeService } from "../types";

const darkModeContext = createContext<DarkModeService>({
  getValue: () => false,
  setValue(v) {},
  toggleValue() {},
});

export default darkModeContext;
