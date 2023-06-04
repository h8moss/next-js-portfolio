import { Root } from "mdast";
import SpellChecker from "spellchecker";
import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";

const spellCheck = lintRule<Root, { lang: "en" | "es" }>(
  "custom-linter:spell-check",
  (tree, file, options) => {
    visit(tree, "text", (node) => {
      // TODO implement spell check
    });
  }
);

export default spellCheck;
