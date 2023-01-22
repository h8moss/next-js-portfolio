import { createElement, HTMLProps } from "react";
import { BsLink45Deg } from "react-icons/bs";

interface Props extends HTMLProps<HTMLHeadingElement> {
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const HeadingWithLink = ({ element, id, children, ...props }: Props) => {
  return (
    <div className="flex">
      {id && (
        <a href={`#${id}`} className="h-min my-auto px-1 ">
          <BsLink45Deg size={30} className="m-auto h-min" />
        </a>
      )}
      {createElement(element, props, children)}
    </div>
  );
};

export default HeadingWithLink;
