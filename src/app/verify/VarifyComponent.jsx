'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VarifyComponent() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(25);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setCanResend(true);
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVarify = async (e) => {
    e.preventDefault();
    const res = await fetch('https://backend-auth-app-production.up.railway.app/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('✅ OTP Verified! Redirecting to Profile Page...');
      router.push('/profile');
    } else {
      alert('❌ Invalid OTP. Try again.');
    }
  };

  const handleResend = async () => {
    const res = await fetch('https://backend-auth-app-production.up.railway.app/api/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      alert('📨 OTP Resent!');
      setOtp('');
      setTimer(25);
      setCanResend(false);
    } else {
      alert('❌ Failed to resend OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-200 p-6">
      <form
        onSubmit={handleVarify}
        className="bg-white bg-opacity-90 backdrop-blur-md border border-orange-200 rounded-3xl shadow-2xl px-10 py-12 w-full max-w-md text-center space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-orange-500">🔐 Verify OTP</h2>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="🔢 Enter OTP"
          className="w-full text-center text-2xl font-bold tracking-widest p-4 rounded-xl border border-orange-300 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-orange-500"
          required
        />

        <div className="flex justify-between items-center gap-3">
          <button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            ✅ Verify
          </button>

          <button
            type="button"
            disabled={!canResend}
            onClick={handleResend}
            className={`flex-1 py-3 rounded-xl font-semibold transition duration-300 ${
              canResend
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            🔁 Resend OTP
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          ⏱️ {canResend ? 'You can resend OTP now.' : `Resend OTP in ${timer}s`}
        </p>
      </form>
    </div>
  );
}