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
      (data.hProperties as Record<string, any>).class += ` ${className}`;
    });
  };

  return transform;
};

export default fileDirective;
