'use client';

import { useEffect, useRef, useState } from 'react';

const RightAds = () => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const renderAd = () => {
      if (!adRef.current) return;

      const width = adRef.current.offsetWidth;

      if (width === 0) {
        // Retry until the container has a visible width
        setTimeout(renderAd, 300);
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

    if (typeof window !== 'undefined') {
      renderAd();
    }
  }, []);

  return (
    <div className="sticky top-4 z-40 w-full p-2 rounded-xl bg-white border shadow-md">
      <p className="text-xs text-gray-500 italic mb-2 text-center">Sponsored Ad</p>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="4391646852"
        data-ad-format="autorelaxed"
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

export default RightAds;
