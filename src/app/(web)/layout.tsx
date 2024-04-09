import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// import CardProvider from "@/components/Providers/Providers";

// const poppins = Poppins({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });
const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Centrum Szkoleń Online Landi Academy",
  description: "Centrum Szkoleń Online Landi Academy",
  robots: {
  index: false,
  follow: false,
  nocache: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
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
        {/* <CardProvider> */}
          <Header />
          {children}
          <Footer />
        {/* </CardProvider> */}
      </body>
    </html>
  );
}
