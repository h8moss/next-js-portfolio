import { Root } from "mdast";
import { remark } from "remark";
import { FrozenProcessor } from "unified";

import ensureAltInImages from "./ensure-alt-in-images.js";
import LintError from "./lintError.js";
import noDoubleSpaces from "./noDoubleSpaces.js";
import noH1 from "./noH1.js";
import noLanguagelessCode from "./noLanguagelessCode.js";
import noLeadingOrTrailingSpaces from "./noLeadingOrTrailingSpaces.js";
import spellCheck from "./spellCheck.js";

class Linter {
  constructor() {
    this.processor = remark()
      .use(noDoubleSpaces)
      .use(spellCheck)
      .use(noLeadingOrTrailingSpaces)
      .use(noLanguagelessCode)
      .use(noH1)
      .use(ensureAltInImages);
  }

  processor: FrozenProcessor<Root, Root, Root, string>;

  async lint(value: string): Promise<LintError[]> {
    const result = await this.processor.process(value);

    return result.messages.map((message) => ({
      column: message.column || 0,
      row: message.line || 0,
      name: message.ruleId || "",
      reason: message.reason,
    }));
  }
}

export default Linter;
