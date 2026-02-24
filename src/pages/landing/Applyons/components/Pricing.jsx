

"use client"

import { useState } from "react"
import { Row, Col, Typography, Card, Button, List, Modal } from "antd"
import { CheckOutlined, GroupOutlined, UserOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import { Building, LoaderCircleIcon, MoveRight, Send } from "lucide-react"
import { InfoCircleOutlined } from "@ant-design/icons"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { TextFormInput } from "@/components"
import { createContact } from "@/services/contactService"
import { toast } from "sonner"
import { useSettingsContext } from "@/context"

const { Title, Paragraph, Text } = Typography

const HIDE_PRICE = true

export default function PricingApplyons() {
  const { t } = useTranslation()
  const [showContact, setShowContact] = useState(false)
  const [loading, setLoading] = useState(false)
  const [popupPlanIndex, setPopupPlanIndex] = useState(null)
  const { paymentSettings } = useSettingsContext()

  const currencyCode = paymentSettings?.currency || "USD"
  const currencySymbol =
    currencyCode === "USD"
      ? "$"
      : currencyCode === "EUR"
      ? "€"
      : currencyCode === "GBP"
      ? "£"
      : currencyCode

  const entreprisePrice = paymentSettings?.abonnement?.ENTREPRISE
  const applicantPrice = paymentSettings?.application

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
      setShowContact(false);
      reset();
    } else {
      setLoading(false);
      toast.error("An error occurred!");
    }
  };

  const plans = [
    {
      name: t("applyons.pricing.plans.institution.title"),
      description: t("applyons.pricing.plans.institution.description"),
      price: entreprisePrice ?? t("applyons.pricing.plans.institution.price"),
      period: t("applyons.pricing.plans.institution.period"),
      features: t("applyons.pricing.plans.institution.features", { returnObjects: true }),
      highlighted: true,
      buttonType: "primary",
      link: "https://admin.applyons.com/registration?type=institut",
      icon: <GroupOutlined />,
      color: "#254c6b",
      gradient: "linear-gradient(135deg, #254c6b 0%, #764ba2 100%)",
    },
    {
      name: t("applyons.pricing.plans.applicant.title"),
      description: t("applyons.pricing.plans.applicant.description"),
      price: applicantPrice ?? t("applyons.pricing.plans.applicant.price"),
      period: t("applyons.pricing.plans.applicant.period"),
      features: t("applyons.pricing.plans.applicant.features", { returnObjects: true }),
      link: "https://admin.applyons.com/registration?type=demandeur",
      icon: <UserOutlined />,
      color: "#254c6b",
      gradient: "linear-gradient(135deg, #254c6b 0%, #764ba2 100%)",
    },
    {
      name: t("applyons.pricing.plans.universities.title"),
      description: t("applyons.pricing.plans.universities.content"),
      price: null,
      period: t("applyons.pricing.plans.universities.allUsers"),
      features: t("applyons.pricing.plans.universities.features", { returnObjects: true }),
      note: t("applyons.pricing.plans.universities.note"),
      contactText: t("applyons.pricing.plans.universities.contact"),
      link: "mailto:contact@applyons.com",
      buttonText: t("applyons.pricing.plans.universities.contactSale"),
      icon: <Building />,
      color: "#012C4E",
      gradient: "linear-gradient(135deg, #012C4E 0%, #011A34 100%)",
      fullWidth: true,
    },
  ]


  return (
    <div id="pricing" style={{ padding: "60px 0", background: "#f5f7fa", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Title
            level={2}
            style={{
              color: "#254c6b",
              marginBottom: "16px",
              fontSize: "2.2rem",
              fontWeight: "700",
            }}
          >
            {t("applyons.pricing.title")}
          </Title>

          <Paragraph
            style={{
              fontSize: "1rem",
              color: "#4a5568",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.5",
            }}
          >
            {t("applyons.pricing.subtitle")}
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {plans.map((plan, index) => (
            <Col xs={24} md={plan.fullWidth ? 24 : 12} key={index}>
              <Card
                hoverable
                role="button"
                tabIndex={0}
                onClick={() => setPopupPlanIndex(index)}
                onKeyDown={(e) => e.key === "Enter" && setPopupPlanIndex(index)}
                style={{
                  borderRadius: "16px",
                  background: "white",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    background: plan.gradient,
                    padding: "24px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "white",
                      marginBottom: "12px",
                    }}
                  >
                    {plan.icon}
                  </div>
                  <Title
                    level={4}
                    style={{
                      color: "white",
                      marginBottom: "4px",
                      fontSize: "1.2rem",
                    }}
                  >
                    {plan.name}
                  </Title>
                  <Paragraph
                    style={{
                      color: "rgba(255, 255, 255, 0.9)",
                      marginBottom: "0",
                      fontSize: "0.9rem",
                    }}
                  >
                    {plan.description}
                  </Paragraph>
                </div>

                <div style={{ padding: "24px" }}>
                  {plan.contactText ? (
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                      <Title
                        level={2}
                        style={{
                          marginBottom: "0",
                          fontSize: "1.5rem",
                          color: plan.color,
                        }}
                      >
                        {plan.contactText}
                      </Title>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px" }}>
                        {(!plan.price || HIDE_PRICE) && (
                          <Title
                            level={2}
                            style={{
                              marginBottom: "0",
                              fontSize: "1.5rem",
                              color: "#1a202c",
                            }}
                          >
                            {t("applyons.pricing.priceOnRequest")}
                          </Title>
                        )}
                        {plan.price && !HIDE_PRICE && (
                          <>
                            <Text style={{ fontSize: "1rem", color: "#718096" }}>
                              {currencySymbol}
                            </Text>
                            <Title
                              level={2}
                              style={{
                                marginBottom: "0",
                                fontSize: "2rem",
                                color: "#1a202c",
                              }}
                            >
                              {plan.price}
                            </Title>
                          </>
                        )}
                      </div>
                      {!HIDE_PRICE && <Text style={{ fontSize: "0.9rem", color: "#718096" }}>{plan.period}</Text>}
                    </div>
                  )}

                  <List
                    itemLayout="horizontal"
                    dataSource={plan.features}
                    renderItem={(item) => (
                      <List.Item style={{ borderBottom: "none", padding: "8px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: plan.color || "#10b981",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CheckOutlined style={{ color: "white", fontSize: "10px" }} />
                          </div>
                          <Text style={{ fontSize: "0.9rem", color: "#4a5568" }}>{item}</Text>
                        </div>
                      </List.Item>
                    )}
                    style={{ marginBottom: "24px" }}
                  />

                  {plan.note && (
                    <Paragraph
                      style={{
                        fontSize: "0.875rem",
                        color: "#e53e3e",
                        fontStyle: "italic",
                        marginBottom: "16px",
                      }}
                    >
                      {plan.note}
                    </Paragraph>
                  )}

                  <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "#254c6b", fontSize: "0.8rem" }}>
                    <InfoCircleOutlined />
                    <span>{t("applyons.pricing.clickForMore")}</span>
                  </div>

                  <Button
                    type="primary"
                    block
                    size="middle"
                    style={{
                      height: "48px",
                      borderRadius: "12px",
                      background: plan.gradient,
                      border: "none",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (plan.link && plan.link.startsWith("http")) {
                        window.open(plan.link, "_blank", "noopener,noreferrer")
                      } else if (plan.link && plan.link.startsWith("mailto")) {
                        window.location.href = plan.link
                      } else {
                        setShowContact(!showContact)
                      }
                    }}
                  >
                    {plan.buttonText || t("applyons.pricing.plans.cta")}
                    {plan.buttonText && <MoveRight style={{ marginLeft: "8px", width: "16px", height: "16px" }} />}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          open={popupPlanIndex !== null}
          onCancel={() => setPopupPlanIndex(null)}
          footer={null}
          width={560}
          centered
          styles={{ body: { padding: "24px 0" } }}
        >
          {popupPlanIndex !== null && (() => {
            const plan = plans[popupPlanIndex]
            const planKey = ["institution", "applicant", "universities"][popupPlanIndex]
            const moreKey = `applyons.pricing.plans.${planKey}.more`
            const moreText = t(moreKey)
            return (
              <>
                <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: plan.color, fontSize: "1.5rem" }}>{plan.icon}</span>
                  <Title level={4} style={{ margin: 0, color: plan.color }}>
                    {plan.name}
                  </Title>
                </div>
                <Paragraph style={{ color: "#4a5568", marginBottom: "16px" }}>
                  {plan.description}
                </Paragraph>
                <List
                  size="small"
                  dataSource={plan.features}
                  renderItem={(item) => (
                    <List.Item style={{ borderBottom: "none", padding: "4px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckOutlined style={{ color: plan.color }} />
                        <Text style={{ fontSize: "0.9rem" }}>{item}</Text>
                      </div>
                    </List.Item>
                  )}
                  style={{ marginBottom: "16px" }}
                />
                {moreText && moreText !== moreKey && (
                  <Paragraph style={{ fontSize: "0.9rem", color: "#718096", marginBottom: 0 }}>
                    {moreText}
                  </Paragraph>
                )}
              </>
            )
          })()}
        </Modal>

        {showContact && (
          <div style={{ marginTop: "24px" }} className="bg-[#254c6b] dark:bg-gray-800 p-8 rounded-lg shadow-lg">

            <div className="grid xl:grid-cols-2 grid-cols-1 gap-12 items-center">
              <div>
                <Title
                  level={4}
                  style={{
                    color: "white",
                    marginBottom: "4px",
                    fontSize: "1.8rem",
                    textAlign: "center",
                  }}
                >
                  {t('ContactContent.subTitle4')}
                </Title>

                <Paragraph style={{ fontSize: "1rem", color: "white", textAlign: "center" }}>
                  {t('ContactContent.subTitle5')}
                </Paragraph>
              </div>

              <div >
                {/* <h3 className="text-2xl font-semibold text-[white] dark:text-white">
                  {t('ContactContent.subTitle4')}
                </h3>
                <p className="text-base text-white dark:text-gray-300 mt-4">
                  {t('ContactContent.subTitle5')}
                </p> */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                  <TextFormInput
                    name="name"
                    label={t('ContactContent.name')}
                    labelClassName="text-white dark:text-white"
                    className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder={t('ContactContent.name')}
                    control={control}
                    fullWidth
                  />
                  <TextFormInput
                    name="email"
                    label={t('ContactContent.email')}
                    type="email"
                    labelClassName="text-white dark:text-white"
                    className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder={t('ContactContent.email')}
                    control={control}
                    fullWidth
                  />
                  <TextFormInput
                    name="subject"
                    label={t('ContactContent.subject')}
                    labelClassName="text-white dark:text-white"
                    className="h-12 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder={t('ContactContent.subject')}
                    control={control}
                    fullWidth
                  />
                  <TextFormInput
                    name="object"
                    label={t('ContactContent.needs')}
                    labelClassName="text-white dark:text-white"
                    className="h-24 rounded-md py-4 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder={t('ContactContent.needs')}
                    control={control}
                    fullWidth
                  // multiline
                  />


                  <Button
                    htmlType="submit"
                    block
                    size="middle"
                    disabled={loading}
                    style={{
                      height: "48px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #012C4E 0%, #011A34 100%)",
                      border: "none",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                    className="transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    {!loading ?
                      t('ContactContent.send')
                      :
                      t('ContactContent.Submitting')}
                    {loading ? <LoaderCircleIcon className="animate-spin text-[white]" /> : <Send style={{ marginLeft: "8px", width: "16px", height: "16px" }} />}

                  </Button>


                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}