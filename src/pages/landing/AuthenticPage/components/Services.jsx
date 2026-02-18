import { useState } from "react";
import { LuFileCheck, LuLayers, LuFileLock } from "react-icons/lu";
import backgroundImage from "@/assets/images/landing/hosting/services.jpg";
import { useTranslation } from "react-i18next";

const services = [
  {
    title: "1. Authentication and Verification Tool:",
    description: (
      <>
        <strong>Advanced Fraud verification System</strong>: AuthenticPage does not really rely on an algorithm to verify a document. Our tangible fraud detection system utilizes advanced technologies such as micro-clouding to prove the provenance of documents through an authentication document number (ADN), previously stored in a micro-cloud and accessible via a unique access number, ensuring the provenance at the highest level of document security and privacy.
      </>
    ),
    icon: LuFileCheck,
    moreInfo: (
      <>
        AuthenticPage provides a comprehensive and future-focused solution to the problem of document fraud, offering government institutions, embassies, schools, financial institutions, businesses, and individuals the assurance that the documents they receive are genuine and valid.
        <br />
        <strong>Secure Cloud Storage Integration</strong>: We offer secure cloud storage integration, enabling users to store their important documents in a centralized location. This not only ensures easy access and backup but also enhances security and redundancy.
        <br />
        <strong>Easy access</strong>: Our user-friendly interface allows for quick and convenient document verification, making the process seamless and hassle-free. With our cutting-edge technology and commitment to customer satisfaction, we are confident that AuthenticPage is the ideal choice for all document verification needs.
        <br />
        <strong>Real-Time Authentication Updates</strong>: Our platform provides real-time authentication updates, allowing users to receive instant notifications regarding the status and verification (or application) of their documents. This eliminates the need for manual follow-ups and provides peace of mind.
      </>
    ),
  },
  {
    title: "2. Mass Authentication Tool:",
    description: (
      <>
        This tool is primarily for schools to help them authenticate thousands of diploma, certificates, and exam records in one click by generating Authentication Document Numbers (known as AND) for each of them. The Authentication Document Number generation refers to the process of creating unique identification numbers for important documents to ensure their authenticity and prevent fraud. These document numbers are typically generated using specific algorithms or formats that make them difficult to replicate or tamper with.
      </>
    ),
    icon: LuLayers,
    moreInfo: (
      <>
        The authentication document number serves as a unique identifier that can be used to verify the validity and origin of the document through AuthenticPage.com. It can help establish the document's authenticity and integrity, especially when combined with other security measures such as encryption, digital signatures, or watermarking.
        <br />
        By generating authentication document numbers, universities, businesses, and individuals can have a reliable way to track and verify the authenticity of important documents, such as contracts, financial records, government-issued IDs, diplomas, or any academic certificates. This helps to reduce the risk of fraud and ensures that documents can be trusted in various legal, financial, or administrative processes.
      </>
    ),
  },
  {
    title: "3. Application Tool (feature): Get it from the source",
    description: (
      <>
        Get your applicant document from the issuer in one click. See the progression on the checklist board and get notified when an application is ready for review.
      </>
    ),
    icon: LuFileLock,
    moreInfo: (
      <>
        Authentic Application is a document-forwarding tool that helps schools, banks, embassies, or any institutions or companies that require documents from applicants and care that they are not fake, to get them from the source (The issuer), not from the applicants.
      </>
    ),
  },
];

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { t } = useTranslation();
  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <section
      id="features"
      className="py-20 md:py-20 lg:py-44 bg-cover bg-center animate-fade-in-up"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#24377A] animate-fade-in-up">
            {t('services.title')}
          </h2>
          <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>
          <p className="text-lg text-default-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="relative group hover:scale-105 transition-transform duration-300 h-auto overflow-visible"
              >
                <div className="relative border border-default-200 rounded-lg p-8 bg-white text-center shadow-lg group-hover:shadow-2xl transition-shadow duration-500 min-h-[450px]">
                  <div className="flex justify-center mb-6">
                    <Icon className="h-14 w-14 text-[#24377A]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#24377A] mb-4">
                    {t(`services.items.${idx + 1}.title`)}
                  </h3>
                  <p className="text-left text-base text-default-600 leading-relaxed mb-4">
                    {t(`services.items.${idx + 1}.description`)}
                  </p>
                  {/* {isExpanded && (
                    <p className="text-justify text-base text-default-600 leading-relaxed">
                      {t(`services.items.${idx + 1}.moreInfo`)}
                    </p>
                  )} */}
                  {/* <button
                    onClick={() => handleExpand(idx)}
                    className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-white bg-[#24377A] rounded hover:bg-[#1d2f69] transition-colors"
                  >
                    {t('services.moreInfo')}
                  </button> */}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#012C4E] to-[#012C4E]/80 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 rounded-lg" />
              </div>
            );
          })}
        </div>
      </div>
      {/* Animation CSS */}
      <style >{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.7s ease-in-out;
                }

                .animate-underline {
                    animation: fadeInUp 1s ease-in-out 0.5s;
                    animation-fill-mode: both;
                }
            `}</style>
    </section>
  );
};

export default Services;
