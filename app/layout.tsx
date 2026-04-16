import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salary Data Monitor — Know When Equifax Shares Your Pay",
  description: "Monitor what Equifax's Work Number database sells about your salary. Get instant alerts when your employment or income data is accessed or updated."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-[#c9d1d9] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
