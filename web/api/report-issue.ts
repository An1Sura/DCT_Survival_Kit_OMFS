import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminSupabase, getUserFromRequest } from "./_shared/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const user = await getUserFromRequest(new Request("https://local", { headers: req.headers as HeadersInit }));
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const body = req.body || {};
  const description = String(body.description || "").trim();

  if (!description) {
    res.status(400).json({ error: "Description is required" });
    return;
  }

  const { error } = await getAdminSupabase().from("reported_issues").insert({
    user_id: user.id,
    issue_type: body.issueType === "technical" ? "technical" : "clinical",
    content_id: body.contentId || null,
    title: body.title || body.category || null,
    description,
    url: body.url || null,
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ ok: true });
}
