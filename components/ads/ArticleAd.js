// components/ads/ArticleAd.js
'use client'
import { useEffect } from 'react';

export default function ArticleAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm text-center">
      <p className="text-sm text-gray-500 italic mb-2">Advertisement</p>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="9883427512"
      />
    </div>

  );
}
