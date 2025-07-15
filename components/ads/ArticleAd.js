'use client';

import { useEffect, useRef, useState } from 'react';

export default function ArticleAd() {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const tryPushAd = () => {
      const width = adRef.current?.offsetWidth || 0;
      if (width === 0) {
        // Retry if container not visible yet
        setTimeout(tryPushAd, 300);
        return;
      }
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (e) {
        console.error('Adsbygoogle error:', e);
        setAdLoaded(false);
      }
    };

    tryPushAd();
  }, []);

  return (
    <div
      ref={adRef}
      className="w-full my-6 py-4 px-2 bg-gray-50 border border-gray-200 rounded-xl shadow-md text-center"
    >
      <p className="text-xs text-gray-400 italic mb-2">Sponsored content</p>

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z" // ✅ Your custom layout key
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="3305560812"
      />

      {!adLoaded && (
        <p className="text-gray-300 text-sm italic mt-2">
          Ad loading... (may be blocked)
        </p>
      )}
    </div>
  );
}
