import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dnexLogo from "../components/ui/dnex-logo.svg";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created. You can now sign in.");
        setTimeout(() => router.push("/login"), 1000);
      }
    } catch (_err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        color: "#111827",
      }}
      className="dark:bg-gray-900 dark:text-gray-100"
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: 32,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          minWidth: 420,
          minHeight: 520,
          color: "#111827",
        }}
        className="dark:bg-gray-800 dark:text-gray-100"
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <Image src={dnexLogo} alt="Dnex Logo" width={100} height={100} style={{ marginBottom: 8 }} />
        </div>
        <h2
          style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: "center" }}
          className="dark:text-black-100"
        >
          Register
        </h2>
        <div
          style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, textAlign: "center" }}
          className="dark:text-gray-400"
        >
          Create a new account
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4, fontWeight: 600 }} className="dark:font-bold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #d1d5db", background: "white" }}
            className="dark:bg-white dark:text-gray-900 dark:border-gray-700"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <label htmlFor="password" style={{ fontWeight: 600 }} className="dark:font-bold">Password</label>
          </div>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              disabled={loading}
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #d1d5db", background: "white" }}
              className="dark:bg-white dark:text-gray-900 dark:border-gray-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={loading}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#6b7280",
              }}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.306.835-2.417 2.22-3.293m3.34-1.612A5.978 5.978 0 0112 7c3.314 0 6 2.686 6 6 0 1.306-.835 2.417-2.22 3.293M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
        </div>
        {error && <div style={{ color: "#dc2626", marginBottom: 16, fontSize: 14 }}>{error}</div>}
        {success && <div style={{ color: "#16a34a", marginBottom: 16, fontSize: 14 }}>{success}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 4,
            background: loading ? "#6b7280" : "#111827",
            color: "white",
            fontWeight: 600,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          className="dark:bg-gray-700 dark:text-gray-100"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 15 }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#000000", textDecoration: "underline", cursor: "pointer" }} className="dark:text-blue-400">Sign In</a>
        </div>
      </form>
    </div>
  );
}
