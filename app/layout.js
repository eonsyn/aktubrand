import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";
import PushNotifications from "@/components/PushNotifications"; // ✅ NEW

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
  description: "Get free quantum for the AKTU exam - Quantum Series - Aktu Brand",
  verification: {
    google: "l447jfQ4xxcrmN2Q_Cq8q3aeuLvLAJo6cVNv35IA96Y",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
         <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-1W81KSW14R"
  strategy="afterInteractive"
/>
<Script id="ga-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-1W81KSW14R');
  `}
</Script>

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404358914933411"
          crossOrigin="anonymous"
        />
        <Script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-2404358914933411?ers=1"
        />
        <Script id="googlefc-present" strategy="afterInteractive">
          {`
            (function() {
              function signalGooglefcPresent() {
                if (!window.frames['googlefcPresent']) {
                  if (document.body) {
                    const iframe = document.createElement('iframe');
                    iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                    iframe.style.display = 'none';
                    iframe.name = 'googlefcPresent';
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
              signalGooglefcPresent();
            })();
          `}
        </Script>
        {/* in article ads */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404358914933411"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <PushNotifications /> {/* ✅ Add this component */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
