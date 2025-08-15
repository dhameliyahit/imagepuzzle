import { useEffect } from "react";

export default function TopAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-client="ca-pub-YOUR-ID"
      data-ad-slot="TOP-BANNER-SLOT-ID"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
