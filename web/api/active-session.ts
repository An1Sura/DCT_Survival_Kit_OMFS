import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminSupabase, getUserFromRequest } from "./_shared/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = await getUserFromRequest(new Request("https://local", { headers: req.headers as HeadersInit }));
  if (!user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const supabase = getAdminSupabase();

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
    const sessionId = typeof body?.sessionId === "string" ? body.sessionId.slice(0, 128) : "";

    if (!sessionId) {
      res.status(400).json({ error: "sessionId is required" });
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        active_session_id: sessionId,
        active_session_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(200).json({ ok: true });
    return;
  }

  if (req.method === "DELETE") {
    const sessionId = typeof req.query.sessionId === "string" ? req.query.sessionId : "";
    const { data } = await supabase
      .from("profiles")
      .select("active_session_id")
      .eq("id", user.id)
      .maybeSingle();

    if (sessionId && data?.active_session_id === sessionId) {
      await supabase
        .from("profiles")
        .update({ active_session_id: null, active_session_at: null, updated_at: new Date().toISOString() })
        .eq("id", user.id);
    }

    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
