import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is required.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-06-24.dahlia",
  });
}

export function getAppUrl() {
  return process.env.APP_URL || process.env.VITE_APP_URL || "http://localhost:8080";
}
