import type { Metadata } from "next";
import { Geist, Crimson_Pro } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Martta Xu — Product Designer",
  description:
    "I design access. Product designer with roots in consulting and a bias for clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${crimsonPro.variable} antialiased`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
