"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://backend-auth-app-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("📩 OTP sent! Check your email.");
      router.push(`/verify?email=${email}`);
    } else {
      alert("❌ Login failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-200 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleLogin}
        className="bg-white bg-opacity-90 backdrop-blur-lg border border-indigo-200 rounded-3xl shadow-2xl w-full max-w-lg px-10 py-12 space-y-6 text-center"
      >
        <h2 className="text-4xl font-extrabold text-indigo-600">🔐 Login</h2>
        <p className="text-gray-600 text-sm">
          Access your account by verifying your email.
        </p>

        <input
          type="email"
          placeholder="📧 Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-indigo-300 p-3 rounded-xl text-lg bg-indigo-50 placeholder:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:scale-105 duration-300"
        >
          🚀 Send OTP
        </button>

        <p className="text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            📝 Register here
          </span>
        </p>
      </form>
    </div>
  );
}