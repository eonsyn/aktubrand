'use client'
import { useEffect, useRef, useState } from 'react';

export default function ArticleAd() {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const tryRenderAd = () => {
      const width = adRef.current?.offsetWidth || 0;
      if (width === 0) {
        // Retry after short delay
        setTimeout(tryRenderAd, 300);
        return;
      }
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (e) {
        console.error("Adsbygoogle error:", e);
        setAdLoaded(false);
      }
    };

    tryRenderAd();
  }, []);

  return (
    <div
      ref={adRef}
      className="my-8 p-4 bg-amber-50 border border-gray-200 rounded-2xl shadow-sm text-center"
    >
      <p className="text-xs text-gray-500 italic mb-3">Sponsored Content</p>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="9883427512"
      />

      {!adLoaded && (
        <div className="text-gray-300 text-sm mt-3 italic">
          Ad space (may be blocked or unavailable)
        </div>
      )}
    </div>
  );
}
