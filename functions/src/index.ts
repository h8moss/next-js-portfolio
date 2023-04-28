import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import * as functions from "firebase-functions";

const app = initializeApp({
  storageBucket: "portfolio-website-1f0f5.appspot.com",
});
const firestore = getFirestore(app);

export const createBlogPost = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw "Missing auth";

  // Create blog post document
  const draftDoc = firestore.doc("admin/draft");

  const draftSn = await draftDoc.get();
  if (!draftSn.exists) throw "Missing Draft document";

  const draftData = draftSn.data()!;

  const title = draftData.title as string;
  const body = draftData.body as string;
  const tags = draftData.tags as string[];
  const language = draftData.language as string;

  const blogDoc = await firestore.collection(`blog-posts-${language}`).add({
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
    if (body.includes(`STORAGE::${basename}::`)) {
      functions.logger.debug(`FOUND "STORAGE::${basename}::"`);
      await file.move(`blog-posts-${language}/${blogDoc.id}/${basename}`);
    } else {
      functions.logger.debug(`DID NOT FIND "STORAGE::${basename}::"`);
      await file.delete();
    }
  }

  return { id: blogDoc.id };
});
