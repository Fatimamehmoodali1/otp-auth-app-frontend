"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-lime-100 to-emerald-200 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-xl w-full text-center border border-green-200 space-y-6">
        <h1 className="text-4xl font-extrabold text-green-700">
          🌟 Welcome to OTP Auth System
        </h1>
        <p className="text-lg text-gray-700">
          🔐 Secure Login & Registration with OTP Email Verification
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <button
            onClick={() => router.push("/register")}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
          >
            📝 Register
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
          >
            🔐 Login
          </button>

          <button
            onClick={() => router.push("/admin")}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-xl font-semibold shadow-md transition"
          >
            🧑‍💼 Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}