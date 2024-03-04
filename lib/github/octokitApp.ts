import { App } from "octokit";

const appId = String(process.env.AGENT_APP_ID);
const webhookSecret = String(process.env.AGENT_WEBHOOK_SECRET);
const privateKey = String(process.env.AGENT_PRIVATE_KEY);

export const octokitApp = new App({
  appId,
  privateKey,
  webhooks: {
    secret: webhookSecret,
  },
});
