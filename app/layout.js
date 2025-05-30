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
    google: "l447jfQ4xxcrmN2Q_Cq8q3aeuLvLAJo6cVNv35IA96Y",
  },
};
{/* <meta name="google-site-verification" a519RGXXnU8_HDFGvb_9NLkro6BAy_BnCXPq8fhFTkY  content="l447jfQ4xxcrmN2Q_Cq8q3aeuLvLAJo6cVNv35IA96Y" /> */}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404358914933411"
     crossorigin="anonymous"></script>
     
         
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />

        {/* Google Analytics Script */}
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1W81KSW14R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1W81KSW14R');
          `}
        </Script>
        
      </body>
    </html>
  );
}
