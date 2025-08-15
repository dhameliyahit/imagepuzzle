import { useEffect } from "react";

export default function BottomAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", marginTop: "10px" }}
      data-ad-client="ca-pub-YOUR-ID"
      data-ad-slot="BOTTOM-BANNER-SLOT-ID"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
