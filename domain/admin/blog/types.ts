import { BlogPost, Locale } from "../../../types";

export type AdminBlog = BlogPost & {
  locale: Locale;
  isPrivate: boolean;
};
