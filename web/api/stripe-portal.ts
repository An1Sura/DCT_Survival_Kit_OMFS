import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminSupabase, getUserFromRequest } from "./_shared/supabase";
import { getAppUrl, getStripe } from "./_shared/stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const user = await getUserFromRequest(new Request("https://local", { headers: req.headers as HeadersInit }));
    if (!user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const supabase = getAdminSupabase();
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.stripe_customer_id) {
      res.status(400).json({ error: "No Stripe customer exists for this account" });
      return;
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${getAppUrl()}/app/billing`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Portal failed" });
  }
}
