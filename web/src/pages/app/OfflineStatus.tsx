import { toast } from "sonner";
import {
  Wifi, WifiOff, RefreshCw, Download, CheckCircle2, AlertTriangle, Clock,
} from "lucide-react";
import { PageContainer, PageHeading } from "@/components/app/PageContainer";
import { useOffline } from "@/context/OfflineContext";
import { PRODUCT } from "@/data/meta";

export default function OfflineStatus() {
  const { online, contentVersion, lastSync, isStale, refreshing, refresh } = useOffline();

  async function doRefresh() {
    await refresh();
    toast.success("Content refreshed.");
  }

  return (
    <PageContainer className="max-w-2xl">
      <PageHeading kicker="Offline & sync" title="Offline content" description="Core clinical and emergency content is designed to stay available offline after the first successful sync." />

      {/* Connection */}
      <div className={`mb-4 flex items-center gap-4 rounded-xl border p-5 ${online ? "border-success/30 bg-success/[0.05]" : "border-brand-gold/40 bg-brand-gold/10"}`}>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${online ? "bg-success/15 text-success" : "bg-brand-gold/20 text-brand-gold-ink"}`}>
          {online ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
        </div>
        <div>
          <div className="font-serif text-lg font-semibold">{online ? "You're online" : "You're offline"}</div>
          <p className="text-sm text-muted-foreground">
            {online ? "Content can sync in the background." : "Cached content remains available. Payment and sign-in are unavailable offline."}
          </p>
        </div>
      </div>

      {/* Status rows */}
      <div className="space-y-3">
        <Row icon={Download} label="Downloaded content version" value={`v${contentVersion}`} />
        <Row
          icon={Clock}
          label="Last successful sync"
          value={lastSync ? new Date(lastSync).toLocaleString() : "Not yet synced"}
        />
        <Row
          icon={isStale ? AlertTriangle : CheckCircle2}
          label="Content freshness"
          value={isStale ? "Stale — refresh recommended" : "Up to date"}
          warn={isStale}
        />
      </div>

      {isStale && (
        <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-sm text-brand-gold-ink">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          Your offline content hasn't synced in a while. Connect and refresh to
          make sure you have the latest clinical guidance.
        </div>
      )}

      <button
        onClick={doRefresh}
        disabled={refreshing || !online}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 font-semibold text-white hover:bg-brand-green-mid disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh now
      </button>

      <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <h2 className="mb-2 font-serif text-base font-semibold text-foreground">How offline works</h2>
        <ul className="space-y-1.5">
          <li>• The app shell and all {PRODUCT.moduleCount} modules / {PRODUCT.toolkitCount} toolkits are cached on first load.</li>
          <li>• Emergency and core clinical content stays available without signal.</li>
          <li>• Payment pages and sign-in responses are never cached for security.</li>
          <li>• A stale-content warning appears if content hasn't synced in 30 days.</li>
        </ul>
      </div>
    </PageContainer>
  );
}

function Row({ icon: Icon, label, value, warn }: { icon: typeof Wifi; label: string; value: string; warn?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <Icon className={`h-5 w-5 ${warn ? "text-brand-gold-ink" : "text-muted-foreground"}`} />
      <span className="flex-1 text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${warn ? "text-brand-gold-ink" : ""}`}>{value}</span>
    </div>
  );
}
