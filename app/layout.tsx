import type { Metadata } from "next";
import { Lora, Roboto } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primetoolsprovider.vercel.app"),
  title: "PrimeToolsProvider - Premium Digital Subscriptions at Unbeatable Prices",
  description:
    "Get premium software subscriptions like LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more at up to 90% off. Trusted by thousands of customers worldwide.",
  keywords: [
    "premium software subscriptions",
    "LinkedIn Premium buy prime tools provider",
    "Adobe Creative Cloud",
    "Canva Pro",
    "digital subscriptions",
    "cheap software",
    "discount software",
    "software deals",
    "Adobe CC discount",
    "Canva Pro cheap",
    "LinkedIn Premium discount",
    "software subscription Pakistan",
    "subscription buy prime tools provider"
  ],
  authors: [{ name: "PrimeToolsProvider" }],
  creator: "PrimeToolsProvider",
  publisher: "PrimeToolsProvider",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://primetoolsprovider.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primetoolsprovider.vercel.app",
    title: "PrimeToolsProvider - Premium Digital Subscriptions at Unbeatable Prices",
    description: "Get premium software subscriptions like LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more at up to 90% off. Trusted by thousands of customers worldwide.",
    siteName: "PrimeToolsProvider",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "PrimeToolsProvider - Premium Digital Subscriptions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeToolsProvider - Premium Digital Subscriptions at Unbeatable Prices",
    description: "Get premium software subscriptions like LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more at up to 90% off. Trusted by thousands of customers worldwide.",
    images: ["/logo.png"],
    creator: "@PrimeToolsPK",
  },
  verification: {
    google: "kQ7PZlZ7QCByXW6mAYsITxSn41HcHYlZroeTF-neGcY",
    yandex: "your-yandex-verification-code",
  },
  category: "Software & Technology",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PrimeToolsProvider",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://primetoolsprovider.vercel.app/",
      "name": "PrimeToolsProvider",
      "url": "https://primetoolsprovider.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://primetoolsprovider.vercel.app/logo.png",
      },
      "description": "Premium digital subscriptions at unbeatable prices. Get genuine software subscriptions for LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+92-343-8782614",
        "contactType": "customer service",
        "email": "providerprimetools@gmail.com",
        "availableLanguage": ["English"],
      },
      "sameAs": [
        "https://wa.me/923438782614",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://primetoolsprovider.vercel.app/#website",
      "url": "https://primetoolsprovider.vercel.app",
      "name": "PrimeToolsProvider",
      "description": "Premium digital subscriptions at unbeatable prices",
      "publisher": {
        "@id": "https://primetoolsprovider.vercel.app/#organization",
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://primetoolsprovider.vercel.app/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "Product",
      "@id": "https://primetoolsprovider.vercel.app/#product",
      "name": "Premium Digital Subscriptions",
      "description": "Get premium software subscriptions like LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more at up to 90% off.",
      "image": "https://primetoolsprovider.vercel.app/logo.png",
      "brand": {
        "@type": "Brand",
        "name": "PrimeToolsProvider",
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PKR",
        "lowPrice": "500",
        "highPrice": "15000",
        "availability": "https://schema.org/InStock",
      },
    },
  ],
};

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${lora.variable} ${roboto.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
