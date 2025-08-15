import { useEffect } from "react";

export default function TopAd() {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{display:"block"}}
            data-ad-client="ca-pub-6594004239342534"
            data-ad-slot="5465972648"
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    );
}
