'use client'; // Required for AdSense with App Router

import { useEffect, useRef, useState } from "react";

const GoogleVerticleAd = ({ slot, style = {}, className = "" }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // Set adLoaded to true after a short delay to simulate load detection
        const timer = setTimeout(() => setAdLoaded(true), 2000); // Or use IntersectionObserver, etc.
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="sticky top-4 z-40 w-full p-2 rounded-xl bg-white border shadow-md">
      <p className="text-xs text-gray-500 italic mb-2 text-center">
        Sponsored Ad
      </p>
      <ins
        ref={adRef}
        className={`adsbygoogle ${className}`}
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {!adLoaded && (
        <p className="text-center text-gray-300 text-xs mt-2 italic">
          Ad loading or blocked
        </p>
      )}
    </div>
  );
};

export default GoogleVerticleAd;
