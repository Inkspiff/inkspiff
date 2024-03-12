import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  interface GithubInstallation {
    installation_id: string;
    state: string;
    code: string;
  }
  const _installation: Partial<GithubInstallation> = await req.query;

  const {installation_id, state, code} = _installation as GithubInstallation;

  const [userId, markdownId] = state.split("__")

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    ghInstallationId: installation_id,
    ghSessionCode: code,
  })
    .then(() => {
      res.status(200).json({ message: "Github installation id saved" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}