import { createClient } from "@supabase/supabase-js";

export function getAdminSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

export async function getUserFromRequest(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice("Bearer ".length) : null;

  if (!token) {
    return null;
  }

  const supabase = getAdminSupabase();
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return null;
  }

  return data.user;
}
