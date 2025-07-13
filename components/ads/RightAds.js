'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const RightAds = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error('Adsense error:', error);
      }
    }, 1000); // delay helps if script hasn't initialized

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404358914933411"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="4391646852"
        data-ad-format="autorelaxed"
      />
    </>
  );
};

export default RightAds;
