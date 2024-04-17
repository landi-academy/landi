import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// const poppins = Poppins({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });
const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centrum Szkoleń Online Landi Academy",
  description: "Centrum Szkoleń Online Landi Academy",
  robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={lato.className}>
          <Header />
          {children}
          <Footer />
      </body>
      <GoogleAnalytics gaId='G-15H1P4FH3Z' />
    </html>
  );
}
