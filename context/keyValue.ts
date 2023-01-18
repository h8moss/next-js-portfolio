import { createContext } from "react";

import { KeyValueService } from "../types";

const createKeyValueContext = <T, U>() => {
  return createContext<KeyValueService<T, U>>({
    getValue: () => null,
    setValue: () => {},
    addListener: () => {},
    notifyListeners: () => {},
    removeListener: () => {},
  });
};

const stringNumberContext = createKeyValueContext<string, number>();

export default createKeyValueContext;
export { stringNumberContext };
