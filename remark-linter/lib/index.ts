import ensureAltInImages from "./ensure-alt-in-images.js";
import Linter from "./linter.js";
import LintError from "./lintError.js";
import noDoubleSpaces from "./noDoubleSpaces.js";
import noH1 from "./noH1.js";
import noLanguagelessCode from "./noLanguagelessCode.js";
import noLeadingOrTrailingSpaces from "./noLeadingOrTrailingSpaces.js";
import spellCheck from "./spellCheck.js";

export {
  ensureAltInImages,
  Linter,
  noDoubleSpaces,
  noH1,
  noLanguagelessCode,
  noLeadingOrTrailingSpaces,
  spellCheck,
};

export type { LintError };
