// components/ads/ArticleAd.js
'use client'

import { useEffect, useState } from 'react';

export default function ArticleAd() {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdLoaded(true);
    } catch (e) {
      console.error("Adsbygoogle error:", e);
      setAdLoaded(false);
    }
  }, []);

  return (
    <div className="my-8 p-4 bg-amber-600 border border-gray-200 rounded-2xl shadow-sm text-center">
      <p className="text-xs text-gray-400 italic mb-3">Sponsored Content</p>

      
      <ins className="adsbygoogle"
     style={{ display: "block", width: "100%", textAlign: 'center' }}
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-2404358914933411"
     data-ad-slot="5314448923"></ins>

      {!adLoaded && (
        <div className="text-gray-300 text-sm mt-3 italic">
          Ad space (may _ be blocked or unavailable)
        </div>
      )}
    </div>
  );
}
