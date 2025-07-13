'use client'
// components/RightAds.js
import { useEffect } from 'react';
import Script from 'next/script';

const RightAds = () => {
  useEffect(() => {
    try {
      // Push the ad to the adsbygoogle array after the component mounts
      if (window.adsbygoogle) {
        (window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Adsense error:", error);
    }
  }, []);

  return (
    <>
      {/* Load the AdSense script globally */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404358914933411"
        crossOrigin="anonymous"
        strategy="lazyOnload" // Or "afterInteractive" depending on your preference
      />

      {/* The ad unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="4391646852"
      ></ins>
    </>
  );
};

export default RightAds;