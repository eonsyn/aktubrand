// components/ads/GoogleAd.js
import { useEffect } from "react";

const GoogleVerticleAd = ({ slot, style = {}, className = "" }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdsbyGoogle push error:", e);
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
    ></ins>
  );
};

export default GoogleVerticleAd;
