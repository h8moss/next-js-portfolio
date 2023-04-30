import { getFunctions, httpsCallable } from "firebase/functions";

import { Locale } from "../../../types";
import app from "../firebase";

const functions = getFunctions(app);

export const createBlogPost = httpsCallable<void, { id: string }>(
  functions,
  "createBlogPost"
);

type BlogIdentificationData = {
  id: string;
  locale: Locale;
  isPrivate: boolean;
};
type SuccessResponse = { success: boolean };

export const deleteBlogPost = httpsCallable<
  BlogIdentificationData,
  SuccessResponse
>(functions, "deleteBlogPost");

export const toggleBlogPrivacy = httpsCallable<
  BlogIdentificationData,
  SuccessResponse
>(functions, "toggleBlogPrivacy");

export const setBlogAsDraft = httpsCallable<
  BlogIdentificationData,
  SuccessResponse
>(functions, "setBlogAsDraft");

export default functions;
