import { visit } from "unist-util-visit";
import { h } from "hastscript/html.js";
import { Plugin, Transformer } from "unified";
import { Node } from "unist";
import { Root } from "remark-directive";

interface Params {
  tag?: string;
  className?: string;
  titleClass?: string;
}

const noteDirective: Plugin<[Params], Root> = ({
  tag = "p",
  className = "note",
  titleClass = "title",
}) => {
  const transform: Transformer<Root> = (tree) => {
    visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      (node) => {
        if (!("name" in node) || !("attributes" in node)) return;
        if (node.name !== "note") return;

        var data = node.data || (node.data = {});

        data.hName = tag ? tag : "p";
        data.hProperties = node.attributes;

        (data.hProperties as Record<string, any>).class += " " + className;

        for (let c of node.children) {
          if (c.type === "paragraph" && c.data?.directiveLabel) {
            const cData = c.data || (c.data = {});
            const cProps = cData.hProperties || (cData.hProperties = {});

            (cProps as Record<string, any>).class = titleClass;
          }
        }
      }
    );
  };

  return transform;
};

export default noteDirective;
