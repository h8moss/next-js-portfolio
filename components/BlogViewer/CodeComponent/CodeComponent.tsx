import { useContext, useEffect, useMemo, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { stringNumberContext } from "../../../context/keyValue";
import useDarkMode from "../../../hooks/useDarkMode";

interface Props {
  textArray: string[];
  langArray: string[];

  onCopySuccess?: () => unknown;
}

const CodeComponent = ({
  textArray,
  langArray,
  onCopySuccess = () => {},
}: Props) => {
  const key = useMemo(() => {
    const currentArray = [...langArray];
    currentArray.sort();

    return currentArray.join("-");
  }, [langArray]);

  const currentCtx = useContext(stringNumberContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handler = (value: number) => setSelectedIndex(value);
    currentCtx.addListener(key, handler);

    return () => currentCtx.removeListener(key, handler);
  }, [currentCtx, key]);

  const { getValue } = useDarkMode();

  const styleObj = useMemo(() => {
    const darkOrLight = {
      ...(getValue() ? atomDark : materialLight),
    };

    console.log({ darkOrLight });

    return {
      ...darkOrLight,
      'code[class*="language-"]': {
        ...darkOrLight['code[class*="language-"]'],
        fontFamily: "'JetBrains Mono', monospace",
        background: "transparent",
        fontSize: undefined,
      },
      'pre[class*="language-"]': {
        ...darkOrLight['pre[class*="language-"]'],
        background: "transparent",

        fontSize: undefined,
      },
    };
  }, [getValue]);

  return (
    <div
      className={`${
        getValue() ? "bg-gray-800" : "bg-white"
      } m-3 rounded-xl w-full mx-auto`}
    >
      <div
        className={`flex w-full
      
      ${getValue() ? "bg-zinc-900" : "bg-gray-200"}
      `}
      >
        <div className={`flex flex-1  rounded-t-lg overflow-auto`}>
          {langArray.map((v, i) => (
            <button
              key={v}
              onClick={() => currentCtx.setValue(key, i)}
              className={`p-1 rounded-lg rounded-b-none mx-1 ${
                i === (selectedIndex || 0)
                  ? getValue()
                    ? "bg-gray-800"
                    : "bg-white"
                  : ""
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          className="p-2"
          onClick={async () => {
            await navigator.clipboard.writeText(textArray[selectedIndex]);
            onCopySuccess();
          }}
        >
          <MdContentCopy />
        </button>
      </div>
      <SyntaxHighlighter
        language={langArray[selectedIndex]}
        className={`bg-black text-white text-sm overflow-auto p-4 `}
        style={styleObj}
      >
        {textArray[selectedIndex]}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeComponent;
