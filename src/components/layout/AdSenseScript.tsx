"use client";

import Script from "next/script";

const adSenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export default function AdSenseScript() {
  if (!adSenseClient) return null;

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClient}`}
      crossOrigin="anonymous"
    />
  );
}
