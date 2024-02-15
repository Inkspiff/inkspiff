import { App } from "octokit";

const appId = String(process.env.GITHUB_ID);
const webhookSecret = String(process.env.GITHUB_SECRET);
const privateKey = String(process.env.GITHUB_PRIVATE_KEY);

export const octokitApp = new App({
  appId,
  privateKey,
  webhooks: {
    secret: webhookSecret,
  },
});
