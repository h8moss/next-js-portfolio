import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
const spellCheck = lintRule("custom-linter:spell-check", (tree, file, options) => {
    visit(tree, "text", (node) => {
        // TODO implement spell check
    });
});
export default spellCheck;
