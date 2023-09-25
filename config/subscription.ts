import { SubscriptionPlan } from "@/types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
    flutterwavePriceId: "",
  features: [
    "3 Markdowns files",
    "Collaborative files",
    "AI integrations",
    // "7 day page history",
    "Invite up to 10 guests",
  ]
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  flutterwavePriceId: process.env.FLUTTERWAVE_PRO_MONTHLY_PLAN_ID || "",
  features: [
    "Unlimited Markdown Files",
    "Github Integrations",
    "Unlimited file uploads",
    "AI Assistant",
    "Invite up to 100 guests",
  ]
}
