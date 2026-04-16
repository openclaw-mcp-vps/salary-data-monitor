import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salary Data Monitor — Know What Equifax Sells About You",
  description: "Monitor Equifax's Work Number database for salary and employment data exposure. Get alerted when your information appears in data broker reports."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-[#c9d1d9] antialiased">{children}</body>
    </html>
  );
}
