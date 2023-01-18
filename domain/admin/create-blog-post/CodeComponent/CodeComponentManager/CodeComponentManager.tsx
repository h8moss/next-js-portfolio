import { PropsWithChildren, useRef, useState } from "react";
import { stringNumberContext } from "../../../../../context/keyValue";

interface Props {}

const CodeComponentManager = ({ children }: PropsWithChildren<Props>) => {
  const keyValue = useRef<Record<string, number>>({});
  const listeners = useRef<
    { key: string; handler: (value: number) => unknown }[]
  >([]);

  const notifyListeners = (key: string) => {
    for (let listener of listeners.current) {
      if (listener.key === key) {
        listener.handler(keyValue.current[key]);
      }
    }
  };

  const getValue = (key: string) => {
    return keyValue.current[key] || null;
  };

  const setValue = (key: string, value: number) => {
    const current = { ...keyValue.current };
    current[key] = value;
    keyValue.current = current;

    notifyListeners(key);
  };

  const addListener = (key: string, handler: (value: number) => unknown) => {
    listeners.current = [
      ...listeners.current,
      {
        handler,
        key,
      },
    ];
  };

  const removeListener = (key: string, handler: (value: number) => unknown) => {
    const currentListeners = [...listeners.current];
    const index = currentListeners.findIndex(
      (v) => v.key === key && v.handler === handler
    );
    if (index !== -1) currentListeners.splice(index, 1);

    listeners.current = currentListeners;
  };

  return (
    <stringNumberContext.Provider
      value={{
        addListener,
        getValue,
        notifyListeners,
        removeListener,
        setValue,
      }}
    >
      {children}
    </stringNumberContext.Provider>
  );
};

export default CodeComponentManager;
