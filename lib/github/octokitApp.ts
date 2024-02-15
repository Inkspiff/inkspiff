import * as fs from "fs";
import { App } from "octokit";

const appId = String(process.env.APP_ID);
const webhookSecret = String(process.env.WEBHOOK_SECRET);
const privateKeyPath = String(process.env.PRIVATE_KEY_PATH);
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

export const octokitApp = new App({
  appId,
  privateKey,
  webhooks: {
    secret: webhookSecret,
  },
});
