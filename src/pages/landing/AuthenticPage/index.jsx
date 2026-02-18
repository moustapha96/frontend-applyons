import { PageMetaData, TopNavBar } from "@/components";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import FAQs from "./components/FAQs";
import Authentifier from "./components/Authentifier";
import Contact from "./components/Contact";
import AboutUs from "./components/About";
import { useTranslation } from "react-i18next";

const AuthenticPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMetaData title="ApplyOns" />


      <TopNavBar
        menuItems={[
          t('nav.home'),
          t('nav.about'),
          t('nav.solutions'),
          t('nav.features'),
          t('nav.pricing'),
          t('nav.contact'),
          t('nav.faq'),
        ]}
        position="fixed"
        hasDownloadButton
      />

      <Hero />

      <AboutUs />

      <Authentifier />

      <Brands />

      <Services />

      <Pricing />

      <Contact />

      <FAQs />
    </>
  );
};

export default AuthenticPage;
