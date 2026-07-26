import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register offline support and refresh stale app code after deployments.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        void registration.update();
      })
      .catch(() => {
        /* offline support is progressive enhancement - ignore failures */
      });
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}
