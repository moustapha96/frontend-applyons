import React, { use } from 'react'

export default function Paypal() {

    const paypal = React.useRef(null);
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=EPVrbMrGtXwKqa_ap6p633vcPzdFbattFojhr_XEPQkO0T9mS_ozWklaRB5Yl_xn-KUaK6Adksw1BOCE&currency=USD";
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div ref={paypal} ></div>
        </div>
    )
}
