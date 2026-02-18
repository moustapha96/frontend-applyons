import company3 from "@/assets/images/landing/company/img-12.png";
import company4 from "@/assets/images/landing/company/img-14.png";
import { cn } from "@/utils";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronUp } from "react-icons/lu";

const faqContent = [
  {
    title: "How can I authenticate my diploma?",
    description:
      "To authenticate your diploma, create an account on our platform and submit an authentication request. A fee of $50 will be charged for each request.",
  },
  {
    title: "Which institutions can use ApplyOns?",
    description:
      "ApplyOns can be used by a variety of institutions, including universities, academic schools, embassies, financial institutions, and businesses. Any organization or entity that needs to verify academic or official documents can benefit from using ApplyOns.",
  },
  {
    title: "What is the subscription cost for institutions?",
    description:
      "Institutions can subscribe to ApplyOns for $100 per month, providing them with unlimited access to document verification services. This subscription allows institutions to submit unlimited authentication requests for various types of documents.",
  },
  {
    title: "Are the data secure?",
    description:
      "Yes, ApplyOns employs advanced security measures to protect sensitive data. We ensure the confidentiality of all user information through encryption, secure cloud storage, and real-time updates. Our platform adheres to high standards of data protection to prevent unauthorized access and ensure privacy.",
  },
  {
    title: "What should I do if I have issues with my authentication request?",
    description:
      "If you encounter any issues with your authentication request, please contact our customer support team via the contact page on our website. Our support team is ready to assist you and resolve any problems or questions you may have regarding the authentication process.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // const toggleAccordion = (index) => {
  //   if (openIndex === index) {
  //     setOpenIndex(null);
  //   } else {
  //     setOpenIndex(index);
  //   }
  // };

  const { t } = useTranslation();
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqContent = t('faqItems', { returnObjects: true });

  return (
    <section
      id={`${t('nav.faq')}`}
      className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">

      {/* <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-600 py-1 px-4 rounded-full text-xs font-semibold uppercase tracking-wider">
            {t('FAQContent.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
            {t('FAQContent.description')}
          </h2>
          <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="space-y-6">
              {faqContent.map((faq, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm",
                    { "shadow-lg": idx === 0 }
                  )}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => toggleAccordion(idx)}
                    aria-controls={`faq-accordion-${idx}`}
                  >
                    {faq.title}
                    <LuChevronUp
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        { "rotate-180": openIndex === idx }
                      )}
                    />
                  </button>
                  <div
                    id={`faq-accordion-${idx}`}
                    className={cn(
                      "px-6 py-4 text-gray-600 dark:text-gray-300 text-sm",
                      { hidden: openIndex !== idx }
                    )}
                  >
                    {faq.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={company4} alt="Main Illustration Apply Ons" className="w-full rounded-lg" />
            </div>
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 lg:w-2/3 xl:w-1/2">
              <img src={company3} alt="Secondary Illustration Apply Ons" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-600 py-1 px-4 rounded-full text-xs font-semibold uppercase tracking-wider">
            {t('FAQContent.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
            {t('FAQContent.description')}
          </h2>
          <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>
        </div>

        {/* FAQ and Images */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Accordion */}
          <div>
            <div className="space-y-6">
              {faqContent.map((faq, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm",
                    { "shadow-lg": idx === 0 }
                  )}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => toggleAccordion(idx)}
                    aria-controls={`faq-accordion-${idx}`}
                  >
                    {faq.title}
                    <LuChevronUp
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        { "rotate-180": openIndex === idx }
                      )}
                    />
                  </button>
                  <div
                    id={`faq-accordion-${idx}`}
                    className={cn(
                      "px-6 py-4 text-gray-600 dark:text-gray-300 text-sm",
                      { hidden: openIndex !== idx }
                    )}
                  >
                    {faq.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={company4} alt="Main Illustration Apply Ons" className="w-full rounded-lg" />
            </div>
            <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 lg:w-2/3 xl:w-1/2">
              <img src={company3} alt="Secondary Illustration Apply Ons" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FAQs;
