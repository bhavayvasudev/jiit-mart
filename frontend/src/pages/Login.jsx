import { useState } from "react";
import PublicHeader from "../components/PublicHeader";
import { GraduationCap, ChefHat } from "lucide-react"; // Ensure you have lucide-react installed

export default function Login({ onLoginSuccess, w, isDarkMode, toggleTheme }) {
  const [role, setRole] = useState("student"); // 👈 NEW: Track Role
  const [enrollment, setEnrollment] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const id = enrollment.trim();
    const pass = password.trim();

    if (!id || !pass) {
      setError(`Please enter ${role === 'owner' ? 'Admin ID' : 'Enrollment'} and password`);
      return;
    }

    // 👈 NEW: Owner Bypass Logic (Since backend mock might only handle students)
    if (role === 'owner') {
        setLoading(true);
        setTimeout(() => {
            // Determine if credentials are correct (Mock logic)
            if (id === "admin" && pass === "admin") { 
                localStorage.setItem("username", "Owner");
                onLoginSuccess("owner"); // 👈 Pass 'owner' role up
            } else {
                // Remove this else block if you want to allow any login for testing
                localStorage.setItem("username", "Owner"); 
                onLoginSuccess("owner");
            }
            setLoading(false);
        }, 800);
        return;
    }

    // STUDENT LOGIC
    if (!w || typeof w.student_login !== "function") {
       console.warn("Backend unavailable, bypassing login");
       onLoginSuccess("student");
       return;
    }

    setError("");
    setLoading(true);

    try {
      await w.student_login(id, pass);
      localStorage.setItem("username", id);
      onLoginSuccess("student"); // 👈 Pass 'student' role up
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <PublicHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="glass w-full max-w-md p-10 rounded-3xl transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black tracking-tight uppercase">
              {role === 'owner' ? 'Admin Portal' : 'Member Access'}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground font-medium">
              {role === 'owner' ? 'Manage orders and menu' : 'Use your enrollment number to sign in.'}
            </p>
          </div>

          {/* 👈 NEW: Role Toggle Buttons */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === "student"
                  ? "bg-white dark:bg-black/40 shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap size={18} /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                role === "owner"
                  ? "bg-white dark:bg-black/40 shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ChefHat size={18} /> Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                placeholder={role === 'owner' ? "Admin ID (try: admin)" : "Enrollment Number"}
                className="w-full rounded-2xl px-5 py-4 text-sm font-medium bg-black/5 dark:bg-white/5 border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:bg-white dark:focus:bg-black/40 focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:scale-[1.01] outline-none"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-2xl px-5 py-4 text-sm font-medium bg-black/5 dark:bg-white/5 border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:bg-white dark:focus:bg-black/40 focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 focus:scale-[1.01] outline-none"
              />
            </div>

            {error && (
              <p className="text-sm font-semibold text-red-500 text-center animate-in fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-full py-4 text-sm font-bold tracking-wide uppercase text-primary-foreground bg-primary shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : role === 'owner' ? "Access Dashboard" : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest opacity-60">
            JIIT Campus Only
          </p>
        </div>
      </div>
    </div>
  );
}