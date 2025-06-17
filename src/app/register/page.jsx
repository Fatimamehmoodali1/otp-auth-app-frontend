"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://backend-auth-app-production.up.railway.app/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to your email.");
      router.push(`/verify?email=${form.email}`);
    } else {
      alert("Registration failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-indigo-200 px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Your Account</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Please fill in the form to register</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Sarah Khan"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. sarah@example.com"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input
              id="phone"
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="03XX-XXXXXXX"
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-xl transition duration-200"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full sm:w-1/2 border border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold py-2.5 rounded-xl transition duration-200"
            >
              Go to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}