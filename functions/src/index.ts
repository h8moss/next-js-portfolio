import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions";
import { HttpsError } from "firebase-functions/v1/auth";

const app = initializeApp({
  storageBucket: "portfolio-website-1f0f5.appspot.com",
});
const firestore = getFirestore(app);

const firestoreDocFromBlogData = ({
  locale,
  isPrivate,
  id,
}: {
  locale: string;
  isPrivate: boolean;
  id: string;
}) => {
  const isPrivateString = (priv: boolean) => (priv ? "-private" : "");

  return firestore.doc(
    `blog-posts-${locale}${isPrivateString(isPrivate)}/${id}`
  );
};

export const createBlogPost = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      "permission-denied",
      "Authentication is required"
    );

  // Create blog post document
  const draftDoc = firestore.doc("admin/draft");

  const draftSn = await draftDoc.get();
  if (!draftSn.exists)
    throw new functions.https.HttpsError("not-found", "Missing draft document");

  const draftData = draftSn.data()!;

  const title = draftData.title as string;
  const body = draftData.body as string;
  const tags = draftData.tags as string[];
  const language = draftData.language as string;

  const blogDoc = await firestore
    .collection(`blog-posts-${language}-private`)
    .add({
      title,
      body,
      tags,
      created: Timestamp.now(),
    });

  draftDoc.update({
    title: "",
    body: "",
    tags: [],
    language: "en",
  });

  // Move all blog post images
  const storage = getStorage(app);
  const [files] = await storage.bucket().getFiles({
    prefix: "draft/",
    delimiter: "/",
  });

  for (let file of files) {
    const basename = file.name.split("/").at(-1);

    functions.logger.debug(`SEARCHING FOR "STORAGE::${basename}::"`);
    if (basename && body.includes(basename)) {
      functions.logger.debug(`FOUND "${basename}"`);
      await file.move(`blog-posts-${language}/${blogDoc.id}/${basename}`);
    } else {
      functions.logger.debug(`DID NOT FIND "${basename}"`);
      await file.delete();
    }
  }

  return { id: blogDoc.id };
});

export const deleteBlogPost = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      "permission-denied",
      "Authentication is required"
    );

  const { id, locale, isPrivate } = data;
  if (!id || !locale || isPrivate === undefined) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "missing either id, locale or isPrivate fields"
    );
  }

  await firestoreDocFromBlogData(data).delete();

  return { success: true };
});

export const toggleBlogPrivacy = functions.https.onCall(
  async (data, context) => {
    if (!context.auth)
      throw new functions.https.HttpsError(
        "permission-denied",
        "Authentication is required"
      );

    const { id, locale, isPrivate } = data;
    if (!id || !locale || isPrivate === undefined) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "missing either id, locale or isPrivate fields"
      );
    }

    const originalDoc = firestoreDocFromBlogData(data);

    const newDoc = firestoreDocFromBlogData({ ...data, isPrivate: !isPrivate });

    const docData = (await originalDoc.get()).data();

    if (!docData)
      throw new HttpsError("not-found", "Could not find original document");

    await newDoc.create(docData);
    await originalDoc.delete();
    return { success: true };
  }
);

export const setBlogAsDraft = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    throw new functions.https.HttpsError(
      "permission-denied",
      "Authentication is required"
    );

  const { id, locale, isPrivate } = data;
  if (!id || !locale || isPrivate === undefined) {
    if (!id || !locale || isPrivate === undefined) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "missing either id, locale or isPrivate fields"
      );
    }
  }

  const document = firestoreDocFromBlogData(data);
  const draft = firestore.doc("admin/draft");

  const docData = (await document.get()).data();

  if (!docData)
    throw new functions.https.HttpsError(
      "not-found",
      "Original document does not exist"
    );

  await draft.update(docData);

  return { success: true };
});
