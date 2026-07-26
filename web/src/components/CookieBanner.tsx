import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cookieKey = "dct:cookie-ack";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(cookieKey) !== "true");
  }, []);

  if (!visible) return null;

  return (
    <aside className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-border bg-card p-4 text-sm shadow-2xl">
      <div className="font-semibold">Cookies & local storage</div>
      <p className="mt-1 text-muted-foreground">
        We use essential cookies/local storage for sign-in, progress, billing handoff
        and app preferences. No advertising trackers.
      </p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(cookieKey, "true");
            setVisible(false);
          }}
          className="rounded-full bg-brand-green px-4 py-2 text-xs font-semibold text-white hover:bg-brand-green-mid"
        >
          Got it
        </button>
        <Link to="/cookies" className="text-xs font-semibold text-brand-green hover:underline">
          Learn more
        </Link>
      </div>
    </aside>
  );
}
