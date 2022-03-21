import { DateAgoTextBody } from "../../../services/dateOperations/types";
import { I18n } from "../../../types";

export type LanguageBody = {
  dateOp: DateAgoTextBody;
  noBlogText: string;
};

export type I18nBody = I18n<LanguageBody>;
