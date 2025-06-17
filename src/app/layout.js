import "./globals.css";

export const metadata = {
  title: "OTP Auth App",
  description: "Register, Verify & Manage users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}