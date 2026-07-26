import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readJSON, writeJSON } from "@/lib/storage";
import { PRODUCT } from "@/data/meta";

/**
 * Offline status surface.
 * Tracks network status, the downloaded content version, and last sync time.
 * The service worker (see public/sw.js) does the actual caching; this context
 * only reflects and controls status shown to the user.
 */
interface OfflineValue {
  online: boolean;
  contentVersion: string;
  lastSync: number | null;
  isStale: boolean;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

const OfflineContext = createContext<OfflineValue | null>(null);

const STALE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState<boolean>(navigator.onLine);
  const [lastSync, setLastSync] = useState<number | null>(() =>
    readJSON<number | null>("lastSync", null),
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  // Record an initial sync timestamp on first successful load.
  useEffect(() => {
    if (lastSync == null && navigator.onLine) {
      const t = Date.now();
      setLastSync(t);
      writeJSON("lastSync", t);
    }
  }, [lastSync]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        await reg?.update();
      }
      const t = Date.now();
      setLastSync(t);
      writeJSON("lastSync", t);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const value = useMemo<OfflineValue>(
    () => ({
      online,
      contentVersion: PRODUCT.contentVersion,
      lastSync,
      isStale: lastSync != null && Date.now() - lastSync > STALE_MS,
      refreshing,
      refresh,
    }),
    [online, lastSync, refreshing, refresh],
  );

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOffline(): OfflineValue {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error("useOffline must be used within OfflineProvider");
  return ctx;
}
