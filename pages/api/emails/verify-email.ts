// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var postmark = require("postmark");
const nodemailer = require("nodemailer");
import { db } from "@/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  addDoc,
  setDoc,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail } = req.body;

  let transporter = nodemailer.createTransport({
    secure: false, // true for 465, false for other ports
    host: process.env.EMAIL_SERVER_HOST as string,
    port: parseInt(process.env.EMAIL_SERVER_PORT as string),
    auth: {
      user: process.env.EMAIL_SERVER_USER as string,
      pass: process.env.EMAIL_SERVER_PASSWORD as string,
    },
  });

  const veryRef = collection(db, "verificationTokens");

  try {
    // store unique token in db
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // console.log({ userEmail });

    const response = await addDoc(veryRef, {
      token: token,
      identifier: userEmail,
      expires: serverTimestamp(),
    });

    // console.log({ response });

    // send mail with defined transport object with html
    let info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: userEmail, // list of receivers
      subject: "Verify your email", // Subject line
      text: `Click the link to verify your email: ${process.env.NEXT_PUBLIC_SITE_URL}/login/verify-email?token=${token}`, // plain text body
      html: `<a href="${process.env.NEXT_PUBLIC_SITE_URL}/login/verify-email?token=${token}">Click here to verify your email</a>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
