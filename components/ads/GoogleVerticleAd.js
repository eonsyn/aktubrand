"use client"; // This is important for ads to work in App Router

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
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", width: "100%", ...style }}
      data-ad-client="ca-pub-2404358914933411"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
 

export default GoogleVerticleAd;
