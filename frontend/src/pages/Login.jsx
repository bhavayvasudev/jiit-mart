import { useState } from "react";
import PublicHeader from "../components/PublicHeader";

export default function Login({ onLoginSuccess, w }) {
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const cleanEnrollment = enrollment.trim();
    const cleanPassword = password.trim();

    if (!cleanEnrollment || !cleanPassword) {
      setError("Please enter enrollment number and password");
      return;
    }

    if (!w || typeof w.student_login !== "function") {
      setError("Login service unavailable");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await w.student_login(cleanEnrollment, cleanPassword);
      localStorage.setItem("username", cleanEnrollment);
      onLoginSuccess();
    } catch {
      setError("Invalid enrollment number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      {/* NOTE: header is now 80px → h-20 */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div
          className="
            glass w-full max-w-md p-8
            transition-all duration-300 ease-out
            animate-in fade-in zoom-in-95
          "
        >
          {/* TITLE */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              JIITMart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Enrollment Number
              </label>
              <input
                type="text"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                placeholder="e.g. 2310XXXX"
                autoComplete="username"
                className="
                  w-full rounded-xl px-4 py-3 text-sm
                  border border-border
                  bg-input
                  text-foreground placeholder:text-muted-foreground
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-ring
                  focus:scale-[1.01]
                "
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="
                  w-full rounded-xl px-4 py-3 text-sm
                  border border-border
                  bg-input
                  text-foreground placeholder:text-muted-foreground
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-ring
                  focus:scale-[1.01]
                "
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive animate-in fade-in">
                {error}
              </p>
            )}

            {/* APPLE LIQUID GLASS BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                mt-4 w-full rounded-xl py-3
                text-sm font-semibold
                text-foreground
                border border-white/25
                bg-white/5
                backdrop-blur-md
                transition-all duration-300 ease-out
                hover:bg-white/10
                hover:scale-[1.02]
                active:scale-95
                disabled:opacity-50
              "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Campus-only access · Secure login
          </p>
        </div>
      </div>
    </div>
  );
}
