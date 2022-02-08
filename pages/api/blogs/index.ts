import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../services/firebase/firestore";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { DocumentData } from "@google-cloud/firestore";

const searchBlogs = async () => {
  let docs = await getDocs(collection(db, "blog-posts"));
  return docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

const getBlog = async (id: String) => {
  let document = await getDoc(doc(db, `blog-posts/${id}`));
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
      data = await searchBlogs();
    } else {
      data = await getBlog(req.query.id as String);
    }
  } catch {
    res.status(400).send("Error understanding request");
    return;
  }
  console.log(data);
  res.status(200).json(JSON.stringify(data));
  return;
}
