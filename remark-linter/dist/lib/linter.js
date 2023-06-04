var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { remark } from "remark";
import ensureAltInImages from "./ensure-alt-in-images.js";
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
    lint(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.processor.process(value);
            return result.messages.map((message) => ({
                column: message.column || 0,
                row: message.line || 0,
                name: message.ruleId || "",
                reason: message.reason,
            }));
        });
    }
}
export default Linter;
