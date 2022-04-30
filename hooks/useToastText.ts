import {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { Props } from "../components/Toast";

interface Arguments {
  props?: HTMLProps<HTMLButtonElement>;
  timeout?: number;
}

const useToastText = ({
  props = {},
  timeout = 3000,
}: Arguments): [Props, Dispatch<SetStateAction<string>>] => {
  const [text, setText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout | null;
    if (text) {
      timeout = setTimeout(() => setText(""), 3500);
    }
    return () => clearTimeout(timeout);
  }, [text]);

  return [
    {
      ...props,
      onDismiss: () => setText(""),
      message: text,
    },
    setText,
  ];
};

export default useToastText;
