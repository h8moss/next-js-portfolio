import { ExtendedDateFormat } from "../../../services/dateOperations/types";
import { I18n, TimeTexts } from "../../../types";

export type LanguageBody = {
  singular: {
    withAgo: TimeTexts;
    withoutAgo: TimeTexts;
  };
  plural: {
    withAgo: TimeTexts;
    withoutAgo: TimeTexts;
  };
};

export type I18nBody = I18n<LanguageBody>;
