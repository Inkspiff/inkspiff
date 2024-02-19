import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { code, installation_id } = await req.body;
    console.log(`code from GH install: ${code}`)
    console.log(`installation ide from GH install: ${installation_id}`)
    // ToDo: firebase stuff
    res.status(200).send("ok");
}
