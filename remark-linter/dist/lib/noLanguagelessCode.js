import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
const noLanguagelessCode = lintRule("custom-linter:no-languageless-code", (tree, file) => {
    visit(tree, "code", (node) => {
        if (!node.lang) {
            file.message("No language-less code blocks. Add a language, if this is intended, add a nonexistent language", node);
        }
    });
});
export default noLanguagelessCode;
