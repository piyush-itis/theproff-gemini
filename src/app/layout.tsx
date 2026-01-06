import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import "@fontsource/press-start-2p/index.css";
import { WalletProvider } from "../components/WalletProvider";

const googleSansCode = JetBrains_Mono({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "proff.fun",
  description: "onchain gaming arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={`${googleSansCode.variable} ${montserrat.variable} antialiased`}
      >
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
// Frontend change 5
// Frontend change 5
