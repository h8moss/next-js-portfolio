import { DocumentData } from "@google-cloud/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../services/firebase/firestore";

const searchBlogs = async (lang: string) => {
  let language = "en";
  if (lang) language = lang;

  let docs = await getDocs(
    query(collection(db, `blog-posts-${language}`), orderBy("created", "desc"))
  );
  return docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

const getBlog = async (id: string, lang: string) => {
  let language = "en";
  if (lang) {
    language = lang;
  }
  let document = await getDoc(doc(db, `blog-posts-${language}/${id}`));
  if (!document.exists()) throw "Document not found!";
  return { ...document.data(), id: document.id };
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).send("Bad request");
    return;
  }

  let data: DocumentData | DocumentData[] = null;
  try {
    if (!req.query.id) {
      data = await searchBlogs(req.query.lang as string);
    } else {
      data = await getBlog(req.query.id as string, req.query.lang as string);
    }
  } catch {
    res.status(400).send("Error understanding request");
    return;
  }
  res.status(200).json(JSON.stringify(data));
  return;
}
