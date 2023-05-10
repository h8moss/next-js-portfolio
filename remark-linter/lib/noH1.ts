import { Root } from "mdast";
import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";

const noH1 = lintRule<Root>("custom-linter:no-h1", (tree, file) => {
  visit(tree, "heading", (node) => {
    if (node.depth === 1) {
      file.message("No heading with depth of 1, change it to depth 2", node);
    }
  });
});

export default noH1;
