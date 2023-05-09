import { Root } from "mdast";
import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";

const noLeadingOrTrailingSpaces = lintRule<Root>(
  "custom-linter:no-leading-or-trailing-spaces",
  (tree, file) => {
    visit(tree, "text", (node) => {
      const value = node.value;

      if (/^\s+/g.test(value)) {
        file.message(
          "Leading whitespaces. Please remove the leading spaces",
          node
        );
      }
      if (/\s+$/gm.test(value)) {
        file.message(
          "trailing whitespaces. Please remove the trailing spaces",
          node
        );
      }
    });
  }
);

export default noLeadingOrTrailingSpaces;
