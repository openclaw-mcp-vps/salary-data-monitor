import type { Metadata } from "next";
import "./globals.css";

const siteTitle = "Salary Data Monitor";
const siteDescription =
  "Monitor what Equifax sells about your salary with Work Number access alerts, requester logs, and risk visibility.";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${siteTitle} | Monitor what Equifax sells about your salary`,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "equifax work number",
    "salary privacy",
    "employment verification alerts",
    "work number monitoring",
    "remote worker privacy",
  ],
  openGraph: {
    title: `${siteTitle} | Monitor what Equifax sells about your salary`,
    description: siteDescription,
    url: "/",
    siteName: siteTitle,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | Monitor what Equifax sells about your salary`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
