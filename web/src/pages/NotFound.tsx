import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-white">
          <Compass className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-5xl font-semibold">404</h1>
        <p className="mt-3 text-lg text-muted-foreground">This page couldn't be found.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="rounded-full border border-border px-5 py-2.5 font-semibold hover:bg-muted">
            Home
          </Link>
          <Link to="/app" className="rounded-full bg-brand-green px-5 py-2.5 font-semibold text-white hover:bg-brand-green-mid">
            Open the app
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
