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

  const supabase = getAdminSupabase();
  const tables = ["bookmarks", "progress", "trust_settings", "reported_issues"] as const;

  for (const table of tables) {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  res.status(200).json({ ok: true });
}
