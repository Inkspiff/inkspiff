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
  const ghInstall: GithubInstallation = _installation as GithubInstallation;
  const [userId, markdownId] = ghInstall.state.split("__")

  console.log({ _installation})

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    ghInstallationId: ghInstall.installation_id,
    ghSessionCode: ghInstall.code,
  })
    .then(() => {
      const redirectUrl = `/editor/${markdownId}?github=${true}`;
      res.redirect(redirectUrl);
  })
    .catch((err) => {
      res.status(500).json(err);
    });
}
