import { addDoc,collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../services/firebase/firestore";

const addContactMessage = async (data) => {
  const col = collection(db, "/contact");
  return await addDoc(col, data);
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).send("Method is not allowed");
    return;
  }

  const body = JSON.parse(req.body);

  if (!body.message || !body.name || !(body.email || body.email === null)) {
    res.status(400).send("Missing parameters");
    return;
  }

  await addContactMessage(body);

  res.status(200).send("Success");
}
