'use client'
// components/RightAds.js
import { useEffect } from 'react';
 
const RightAds = () => {
  useEffect(() => {
    try {
      // Push the ad to the adsbygoogle array after the component mounts
      if (window.adsbygoogle) {
        (window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("Adsense error:", error);
    }
  }, []);

  return (
    <>
      {/* Load the AdSense script globally */}
      <amp-ad width="100%" height="100%"
     type="adsense"
     data-ad-client="ca-pub-2404358914933411"
     data-ad-slot="4391646852"
     data-auto-format="mcrspv"
     data-full-width="">
  <div overflow=""></div>
</amp-ad>
    </>
  );
};

export default RightAds;