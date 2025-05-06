import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aktu Brand",
  description: "Get free quantum for the aktu exam - Quantum Series -Aktu Brand",
  verification: {
    google: "a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Popunder script inserted before ads </head> */}
        {/* <Script
          src="//compassionunsuccessful.com/f0/55/3b/f0553bb8ac6b09b905707e3d635a8a1a.js"
          strategy="beforeInteractive"
          type="text/javascript"
        /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X3T9Z80F2W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X3T9Z80F2W');
          `}
        </Script>
        <script type='text/javascript' src='//compassionunsuccessful.com/a1/3c/a3/a13ca34f5cd77bb10efab9952ec9a25a.js'></script>
      </body>
    </html>
  );
}
