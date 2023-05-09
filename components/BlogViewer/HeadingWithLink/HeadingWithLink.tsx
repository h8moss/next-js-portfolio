import React, { createElement, HTMLProps, useMemo } from "react";
import { BsLink45Deg } from "react-icons/bs";

interface Props extends HTMLProps<HTMLHeadingElement> {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const HeadingWithLink = ({ element, children, id, ...props }: Props) => {
  const trueID = useMemo(() => {
    if (id) return id;

    let text = React.Children.map(children, (c) => c.toString()).join(" ");
    if (!text) return null;

    // make lower case
    text = text.toLowerCase();

    // Remove spaces and non-alphanumeric characters
    text = text.replaceAll(/[^\w\s]/g, "").replaceAll(/ /g, "-");

    // If it starts with a digit, prefix an _
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (digits.includes(text.at(0))) text = `_${text}`;

    return text;
  }, [children, id]);

  return (
    <div className="flex">
      {trueID && (
        <a href={`#${trueID}`} className="h-min my-auto px-1 ">
          <BsLink45Deg size={30} className="m-auto h-min" />
        </a>
      )}
      {createElement(element, { ...props, id: trueID }, children)}
    </div>
  );
};

export default HeadingWithLink;
