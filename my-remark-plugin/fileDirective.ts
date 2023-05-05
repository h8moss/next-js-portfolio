import { visit } from "unist-util-visit";
import { h } from "hastscript/html.js";
import { Plugin, Transformer } from "unified";
import { Node } from "unist";
import { Root } from "remark-directive";

interface Props {
  className: string;
}

const fileDirective: Plugin<[Props], Root> = ({ className }) => {
  const transform: Transformer<Root> = (tree) => {
    visit(tree, ["leafDirective"], (node) => {
      if (!("name" in node) || !("attributes" in node)) return;
      if (node.name !== "file") return;

      var data = node.data || (node.data = {});
      console.log({ node });

      data.hName = "button";
      data.hProperties = node.attributes;
      data.hProperties.class += ` ${className}`;

      node.children.push({
        value: "",
        type: "html",
        data: {
          hProperties: {
            src: "STORAGE::" + node.attributes["data-storage"] + "::",
          },
          hName: "img",
        },
      });

      console.log({ node });
    });
  };

  return transform;
};

export default fileDirective;
