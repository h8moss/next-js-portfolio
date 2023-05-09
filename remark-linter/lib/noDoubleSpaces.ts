import { Root } from "mdast";
import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";

const noDoubleSpaces = lintRule<Root>(
  "custom-linter:no-double-spaces",
  (tree, file) => {
    visit(tree, "text", (node) => {
      const value = node.value;
      const match = value.match(/\s{2,}/);
      if (match) {
        file.message(
          `Too many spaces at character ${value.indexOf(match[0]) + 1}`,
          node
        );
      }
    });
  }
);

export default noDoubleSpaces;
