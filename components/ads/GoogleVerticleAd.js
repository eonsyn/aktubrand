'use client'; // Required for AdSense with App Router

import { useEffect } from "react";

const GoogleVerticleAd = ({ slot, style = {}, className = "" }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
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
        className={`adsbygoogle ${className}`}
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleVerticleAd;
