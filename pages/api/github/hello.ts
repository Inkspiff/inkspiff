// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "@/firebase"
// import dotenv from "dotenv";
import {App} from "octokit";
import {createNodeMiddleware} from "@octokit/webhooks";
import fs from "fs";
import http from "http";

const appId = process.env.GITHUB_APP_ID!;
const webhookSecret = process.env.GITHUB_APP_WEBHOOK_SECRET!;
const privateKeyPath = process.env.GITHUB_APP_PRIVATE_KEY_PATH!;

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// const octokit = new Octokit({ 
//     auth: process.env.GITHUB_SECRET
//   });

  const app = new App({
    appId: appId,
    privateKey: privateKey,
    webhooks: {
      secret: webhookSecret
    },
  });

  
const messageForNewPRs = "Thanks for opening a new PR! Please follow our contributing guidelines to make your PR easier to review.";


  
//   const octokit = await app.getInstallationOctokit(INSTALLATION_ID);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const requestData = JSON.parse(req.body)

    const {payload, octokit} = requestData

    console.log(`Received a pull request event for #${payload.pull_request.number}`);
    
    try {
        await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: payload.pull_request.number,
        body: messageForNewPRs,
        headers: {
            "x-github-api-version": "2022-11-28",
        },
        });
    } catch (error: any) {
        if (error.response) {
        console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
        }
        console.error(error)
    }

    
}
