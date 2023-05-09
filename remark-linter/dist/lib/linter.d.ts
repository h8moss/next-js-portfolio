import { Root } from "mdast";
import { FrozenProcessor } from "unified";
import LintError from "./lintError.js";
declare class Linter {
    constructor();
    processor: FrozenProcessor<Root, Root, Root, string>;
    lint(value: string): Promise<LintError[]>;
}
export default Linter;
