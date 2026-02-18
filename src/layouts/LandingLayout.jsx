import { Preloader } from "@/components";
import AdvertisementPopup from "@/components/Popup";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Suspense, lazy } from "react";
const Footer = lazy(() => import("@/components/Footer"));

const loading = () => <div />;

const LandingLayout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Preloader />}>{children}</Suspense>

      <Suspense fallback={loading()}>
        <Footer />
      </Suspense>
      <WhatsAppButton phoneNumber="+19179439275" />
      {/* <AdvertisementPopup /> */}
    </>
  );
};

export default LandingLayout;
