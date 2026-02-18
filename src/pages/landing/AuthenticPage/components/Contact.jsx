import { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp, LuLineChart, LuMail, LuMoveRight, LuPhone, LuSave } from "react-icons/lu";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { TextFormInput } from "@/components";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import { createContact } from "../../../../services/contactService";

import { useTranslation } from "react-i18next";
import { getAllSimpleConfiguration, getConfiguration } from "@/services/configuraionService";

const Contact = () => {
  const { t } = useTranslation();

  const contactFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    name: yup.string().required("Please enter your name"),
    subject: yup.string().required("Please enter the subject of your message"),
    object: yup.string().required("Please enter your needs"),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit = async (data) => {
    //console.log(data);
    setLoading(true);

    const res = await createContact(data);

    if (res.ok) {
      toast.success("Message sent successfully!");
      setLoading(false);
      reset();
    } else {
      setLoading(false);
      toast.error("An error occurred!");
    }
  };

  const [loading, setLoading] = useState(false);
  // const [configuration, setConfiguration] = useState(null)

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);


  // useEffect(() => {
  //   const fetchDataConfi = async () => {
  //     try {
  //       const resp = await getConfiguration()
  //       //console.log(resp)
  //       // setConfiguration(resp.data)
  //     } catch (error) {
  //       //console.log(error)
  //     }
  //   }

  //   fetchDataConfi()
  // }, []);

  return (

    <section
      id="Contact"
      className="py-20 md:py-20 lg:py-44 bg-default-100 dark:bg-default-50 bg-no-repeat bg-cover bg-[url('../images/other/bg-lines-2.png')] dark:bg-[url('../images/other/bg-lines-2-dark.png')]"
    >
      <div className="container mx-auto">
        {/* Section title */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#24377A]">
            {t('ContactContent.title')}
          </h2>
          <div className="w-16 h-1 bg-[#24377A] mx-auto my-4 rounded"></div>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t('ContactContent.description')}
          </p>
        </div>

        {/* Quick contact section */}
        <div className="flex flex-wrap justify-around gap-8 mb-12">
          {[

            { icon: LuPhone, title: t('ContactContent.callUs'), details: "+1 (929) 637-0971", link: "tel:+19296370971" },
            { icon: LuMail, title: t('ContactContent.emailUs'), details: "support@applyons.com", link: "mailto:support@applyons.com" },
            { icon: LuLineChart, title: t('ContactContent.followUs'), details: "Facebook ApplyOns", link: "https://www.facebook.com/profile.php?id=61577351653295" },
            { icon: LuSave, title: t('ContactContent.discoverOurWork'), details: "applyons.com", link: "https://applyons.com" },

          ].map((contact, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-white dark:bg-default-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <contact.icon className="h-10 w-10 text-[#24377A]" />
              </div>
              <Link to={contact.link} >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{contact.title}</h4>
                <p className="text-base text-gray-600 dark:text-gray-400 mt-2">{contact.details}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Form section */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              <span className="text-[#24377A]">{t('ContactContent.subTitle2')}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6">
              {t('ContactContent.subTitle3')}
            </p>

            <Link
              onClick={toggleShowMore}
              className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-blueLogo text-white rounded-lg hover:bg-rougeLogo transition-colors"
            >
              {showMore ? <> {t('ContactContent.showLess')}   <LuChevronUp className="h-6 w-6 ml-2 text-[#24377A]" /> </> : <> {t('ContactContent.showMore')} <LuChevronDown className="h-6 w-6 ml-2 text-[#24377A]" /> </>}
            </Link>


            {showMore && (
              <div className="mt-8 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('ContactContent.simplifiedValidation')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('ContactContent.simplifiedValidationDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('ContactContent.maximumSecurity')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('ContactContent.maximumSecurityDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('ContactContent.internationalRecognition')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('ContactContent.internationalRecognitionDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('ContactContent.dedicatedSupport')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('ContactContent.dedicatedSupportDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('ContactContent.testimonials')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('ContactContent.testimonialsDesc')}
                  </p>
                </div>
              </div>
            )}
          </div>






          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {t('ContactContent.subTitle4')}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-4">
              {t('ContactContent.subTitle5')}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
              <TextFormInput
                name="name"
                label={t('ContactContent.name')}
                labelClassName="text-gray-900 dark:text-white"
                className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={t('ContactContent.name')}
                control={control}
                fullWidth
              />
              <TextFormInput
                name="email"
                label={t('ContactContent.email')}
                type="email"
                labelClassName="text-gray-900 dark:text-white"
                className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={t('ContactContent.email')}
                control={control}
                fullWidth
              />
              <TextFormInput
                name="subject"
                label={t('ContactContent.subject')}
                labelClassName="text-gray-900 dark:text-white"
                className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={t('ContactContent.subject')}
                control={control}
                fullWidth
              />
              <TextFormInput
                name="object"
                label={t('ContactContent.needs')}
                labelClassName="text-gray-900 dark:text-white"
                className="h-24 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder={t('ContactContent.needs')}
                control={control}
                fullWidth
              // multiline
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo focus:outline-none ${loading ? "cursor-not-allowed" : "cursor-pointer hover:bg-rougeLogo"} `}
              >
                {!loading ? t('ContactContent.send') : t('ContactContent.Submitting')}
                {loading && <LoaderCircleIcon className="animate-spin text-[#24377A]" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
