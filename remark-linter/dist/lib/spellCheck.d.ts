import { Root } from "mdast";
declare const spellCheck: import("unified").Plugin<void[] | [import("unified-lint-rule").Label | import("unified-lint-rule").Severity | {
    lang: "en" | "es";
}] | [boolean | import("unified-lint-rule").Label | import("unified-lint-rule").Severity, {
    lang: "en" | "es";
}], Root>;
export default spellCheck;
