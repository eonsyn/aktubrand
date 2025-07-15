'use client';

import { useEffect } from 'react';
const RightAds = () => {
 useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2404358914933411"
      data-ad-slot="4391646852"
      data-ad-format="autorelaxed"
    ></ins>
  
  );
};

export default RightAds;
