import { Root } from "mdast";
declare const ensureAltInImages: import("unified").Plugin<void[] | [{
    lang: "en" | "es";
} | import("unified-lint-rule").Label | import("unified-lint-rule").Severity] | [boolean | import("unified-lint-rule").Label | import("unified-lint-rule").Severity, {
    lang: "en" | "es";
}], Root>;
export default ensureAltInImages;
