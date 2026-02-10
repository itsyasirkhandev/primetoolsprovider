import type { Metadata } from "next";
import { Lora, Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PrimeToolsProvider - Premium Digital Subscriptions at Unbeatable Prices",
  description:
    "Get premium software subscriptions like LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more at up to 90% off. Trusted by thousands of customers worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lora.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
