"use client";
import React, { useEffect, useRef, useState } from "react";

export default function AktuBlogCardInFeed() {
  const adRef = useRef(null);
  const [isAdVisible, setIsAdVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
          window.adsbygoogle.push({});
          setIsAdVisible(true); // Assume ad loaded successfully
        } else {
          setIsAdVisible(false);
        }
      } catch (err) {
        console.error("Adsense error:", err);
        setIsAdVisible(false);
      }
    }, 300); // small delay ensures DOM ready

    return () => clearTimeout(timer);
  }, []);

  if (!isAdVisible) return null;

  return (
    <div
      ref={adRef}
      className="flex bg-[var(--card-background)] w-full shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:border-[var(--accent)] border border-[var(--border)] transition-all duration-300 cursor-pointer h-[370px] flex-col justify-center items-center"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-format="fluid"
        data-ad-layout-key="-7e+ex+d-5b+81"
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="5733543214"
      ></ins>
    </div>
  );
}
