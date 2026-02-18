"use client";

import { useContext, useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Card,
    Tabs,
    Select,
    DatePicker,
    Alert,
    Typography,
    Row,
    Col,
    Space,
    Spin,
    notification,
} from "antd";
import {
    UserOutlined,
    BankOutlined,
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    GlobalOutlined,
    LockOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "@/AppContext";
import { useTranslation } from "react-i18next";
import { PageMetaData } from "@/components";
import { LoaderCircle } from "lucide-react";
import countries from "@/assets/countries.json";
import dayjs from 'dayjs';


const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

export default function RegistrationPage() {
    const [submitStatus, setSubmitStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("demandeur");
    const [form] = Form.useForm();
    const [formInstitut] = Form.useForm();
    const [formDemandeur] = Form.useForm();
    const { urlApi } = useContext(AppContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [dialCode, setDialCode] = useState("");

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");

    useEffect(() => {
        if (type === "institut" || type === "demandeur") {
            setActiveTab(type);
        }
    }, [searchParams]);

    const handleTabChange = (key) => {
        setActiveTab(key);
        form.resetFields();
        formDemandeur.resetFields();
        formInstitut.resetFields();
        setSubmitStatus("idle");
        setErrorMessage("");
    };

    const handleCountryChange = (value, option) => {
        const selectedCountry = countries.find((country) => country.name === value);
        if (selectedCountry) {
            setDialCode(selectedCountry.dial_code);
            formDemandeur.setFieldsValue({ phone: selectedCountry.dial_code });
            formInstitut.setFieldsValue({ phone: selectedCountry.dial_code });
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        setSubmitStatus("idle");
        setErrorMessage("");
        console.log(JSON.stringify(values));
        try {
            const endpoint =
                activeTab === "demandeur" ? "create-demandeur" : "create-institut";
            const response = await fetch(`${urlApi}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                notification.success({
                    message: t("inscriptionPage.successTitle"),
                    description: t("inscriptionPage.successMessage"),
                    placement: "top",
                });
                formDemandeur.resetFields();
                setSubmitStatus("success");
                navigate(
                    `/account-created?status=success&message=${encodeURIComponent(t("inscriptionPage.successMessage"))}`
                );
            } else {
                const errorText = await response.text();
                throw new Error(errorText || t("inscriptionPage.errorMessage"));
            }
        } catch (error) {
            console.log(error.message);
            setSubmitStatus("error");
            setErrorMessage(
                error 
                    ? error.message
                    : t("inscriptionPage.errorMessage")
            );
            notification.error({
                message: error.message || t("inscriptionPage.errorTitle"),
                description:
                    error instanceof Error
                        ? error.message
                        : t("inscriptionPage.errorMessage"),
                placement: "top",
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishInstitut = async (values) => {
        setLoading(true);
        setSubmitStatus("idle");
        setErrorMessage("");
        console.log("Institut values:", values);
        try {
            const response = await fetch(urlApi + "create-institut", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            //console.log("Institut response:", response)

            if (response.ok) {
                formInstitut.resetFields();
                notification.success({
                    message: "Success",
                    description:
                        t("inscriptionPage.successMessage") ||
                        "Votre compte institut a été créé avec succès.",
                    placement: "top",
                });
                setSubmitStatus("success");
                navigate(
                    `/account-created?status=success&message=inscriptionPage.successMessage`
                );
            } else {
                notification.error({
                    message: "Erreur",
                    description:
                        response.statusText ||
                        "Une erreur est survenue lors de l'inscription",
                    placement: "top",
                });
                throw new Error(
                    response.statusText || "Une erreur est survenue lors de l'inscription"
                );
            }
            //console.log(response)
        } catch (error) {
            //console.log(error)
            setSubmitStatus("error");
            setErrorMessage(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        //console.log("Failed:", errorInfo)
    };

    const tabItems = [
        {
            key: "demandeur",
            label: (
                <Space>
                    <UserOutlined />
                    {t("inscriptionPage.createApplicantAccount")}
                </Space>
            ),
            children: (
                <Form
                    form={formDemandeur}
                    name="demandeur"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={24}>
                            <Form.Item
                                label={t("inscriptionPage.email")}
                                name="email"
                                rules={[
                                    { required: true, message: t("inscriptionPage.enterEmail") },
                                    {
                                        type: "email",
                                        message: t("inscriptionPage.enterValidEmail"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="exemple@domaine.com"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.fullName")}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterFullName"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder={t("inscriptionPage.fullName")}
                                />
                            </Form.Item>
                        </Col>


                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.profession")}
                                name="profession"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterProfession"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder={t("inscriptionPage.profession")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.address")}
                                name="adresse"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterAddress"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<HomeOutlined />}
                                    placeholder={t("inscriptionPage.addressPlaceholder")}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.country")}
                                name="pays_residence"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterCountry"),
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    prefix={<GlobalOutlined />}
                                    placeholder={t("inscriptionPage.countryPlaceholder")}
                                    optionFilterProp="label"
                                    onChange={handleCountryChange}
                                    options={countries.map((country) => ({
                                        label: `${country.name} (${country.dial_code})`,
                                        value: country.name,
                                    }))}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.phone")}
                                name="phone"
                                rules={[
                                    { required: true, message: t("inscriptionPage.enterPhone") },
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="+33 1 23 45 67 89"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.birthPlace")}
                                name="lieu_naissance"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterBirthPlace"),
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    prefix={<HomeOutlined />}
                                    placeholder={t("inscriptionPage.birthPlacePlaceholder")}
                                    optionFilterProp="label"
                                    options={countries.map((country) => ({
                                        label: `${country.name} (${country.dial_code})`,
                                        value: country.name,
                                    }))}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.birthDate")}
                                name="date_naissance"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterBirthDate"),
                                    },
                                ]}
                            >
                                {/* <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder={t("inscriptionPage.birthDatePlaceholder")}
                                    format="DD/MM/YYYY"
                                /> */}
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder={t("inscriptionPage.birthDatePlaceholder")}
                                    format="DD/MM/YYYY"
                                    disabledDate={(current) =>
                                        current && current > dayjs().subtract(18, "year").endOf("day")
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.gender")}
                                name="sexe"
                                rules={[
                                    { required: true, message: t("inscriptionPage.enterGender") },
                                ]}
                            >
                                <Select placeholder={t("inscriptionPage.selectGender")}>
                                    <Option value="Male">{t("inscriptionPage.male")}</Option>
                                    <Option value="Female">{t("inscriptionPage.female")}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.password")}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterPassword"),
                                    },
                                    { min: 8, message: t("inscriptionPage.passwordMinLength") },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={t("inscriptionPage.passwordPlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.confirmPassword")}
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterConfirmPassword"),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(t("inscriptionPage.passwordMismatch"))
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={t("inscriptionPage.confirmPasswordPlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginTop: 32 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                            icon={loading ? <LoadingOutlined /> : <UserOutlined />}
                        >
                            {loading ? (
                                <>{t("inscriptionPage.loading")} </>
                            ) : (
                                t("inscriptionPage.register")
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: "institut",
            label: (
                <Space>
                    <BankOutlined />
                    {t("inscriptionPage.createInstituteAccount")}
                </Space>
            ),
            children: (
                <Form
                    form={formInstitut}
                    name="institut"
                    layout="vertical"
                    onFinish={onFinishInstitut}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.instituteName")}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterInstituteName"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<BankOutlined />}
                                    placeholder={t("inscriptionPage.instituteNamePlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.instituteType")}
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.selectInstituteType"),
                                    },
                                ]}
                            >
                                <Select placeholder={t("inscriptionPage.selectInstituteType")}>
                                    <Option value="Ecole">{t("inscriptionPage.school")}</Option>
                                    <Option value="Banque">{t("inscriptionPage.bank")}</Option>
                                    <Option value="Ambassade">
                                        {t("inscriptionPage.embassy")}
                                    </Option>
                                    <Option value="Université">
                                        {t("inscriptionPage.university")}
                                    </Option>
                                    <Option value="Collège">
                                        {t("inscriptionPage.college")}
                                    </Option>
                                    <Option value="Lycée">
                                        {t("inscriptionPage.highSchool")}
                                    </Option>
                                    <Option value="Traducteur">
                                        {t("inscriptionPage.traducteur")}
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.email")}
                                name="email"
                                rules={[
                                    { required: true, message: t("inscriptionPage.enterEmail") },
                                    {
                                        type: "email",
                                        message: t("inscriptionPage.enterValidEmail"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder={t("inscriptionPage.emailPlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.phone")}
                                name="phone"
                                rules={[
                                    { required: true, message: t("inscriptionPage.enterPhone") },
                                ]}
                            >
                                <Input
                                    prefix={<PhoneOutlined />}
                                    placeholder="+33 1 23 45 67 89"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.address")}
                                name="adresse"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterAddress"),
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<HomeOutlined />}
                                    placeholder={t("inscriptionPage.addressPlaceholder")}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.country_simple")}
                                name="pays_residence"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.country_simple"),
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    prefix={<GlobalOutlined />}
                                    placeholder={t("inscriptionPage.countryPlaceholder")}
                                    optionFilterProp="label"
                                    onChange={handleCountryChange}
                                    options={countries.map((country) => ({
                                        label: `${country.name} (${country.dial_code})`,
                                        value: country.name,
                                    }))}
                                ></Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <Form.Item
                                label={t("inscriptionPage.website")}
                                name="siteWeb"
                                rules={[
                                    { type: "url", message: t("inscriptionPage.enterValidURL") },
                                ]}
                            >
                                <Input
                                    prefix={<GlobalOutlined />}
                                    placeholder="https://www.votre-institut.com"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.password")}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.enterPassword"),
                                    },
                                    { min: 8, message: t("inscriptionPage.passwordMinLength") },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={t("inscriptionPage.passwordPlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label={t("inscriptionPage.confirmPassword")}
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message: t("inscriptionPage.confirmPasswordRequired"),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(t("inscriptionPage.passwordsDoNotMatch"))
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder={t("inscriptionPage.confirmPasswordPlaceholder")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ marginTop: 32 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            size="large"
                            className="bg-blueLogo hover:bg-blue-700"
                            icon={loading ? <LoadingOutlined /> : <BankOutlined />}
                        >
                            {loading ? (
                                <>{t("inscriptionPage.loading")}</>
                            ) : (
                                t("inscriptionPage.register")
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
    ];

    return (
        <>
            <PageMetaData title={t("inscriptionPage.title")} />

            <div
                style={{
                    minHeight: "70vh",
                    // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    // padding: "48px 24px",
                }}
            >
                <div className="w-full max-w-[100%] mx-auto px-2">


                    {/* Success Message */}
                    {submitStatus === "success" && (
                        <Alert
                            message={t("inscriptionPage.successTitle")}
                            description={t("inscriptionPage.successMessage")}
                            type="success"
                            icon={<CheckCircleOutlined />}
                            showIcon
                            style={{ marginBottom: 24 }}
                            closable
                        />
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                        <Alert
                            message={t("inscriptionPage.errorTitle")}
                            description={errorMessage}
                            type="error"
                            icon={<ExclamationCircleOutlined />}
                            showIcon
                            style={{ marginBottom: 24 }}
                            closable
                        />
                    )}

                    <Card
                        style={{
                            boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            borderRadius: 16,
                            border: "none",
                        }}
                    >
                        <div
                            style={{
                                background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
                                margin: "-24px -24px 24px -24px",
                                padding: "32px 24px",
                                borderRadius: "16px 16px 0 0",
                                color: "white",
                            }}
                        >
                            <div className="flex flex-col items-center space-y-4">
                                <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                                <div className="text-center space-y-2">
                                    <Title level={2} style={{ color: "white", marginBottom: 8 }}>
                                        {t("inscriptionPage.createAccount")}
                                    </Title>
                                    <Text style={{ color: "#d1d5db", fontSize: 16 }}>
                                        {t("inscriptionPage.chooseAccountType")}
                                    </Text>
                                </div>
                            </div>
                        </div>

                        <Tabs
                            activeKey={activeTab}
                            onChange={setActiveTab}
                            items={tabItems}
                            size="large"
                            style={{ marginTop: 0 }}
                        />
                    </Card>

                    <div style={{ textAlign: "center", marginTop: 32 }}>
                        <Text style={{ color: "#6b7280" }}>
                            {t("auth.signUp.alreadyAccount")}
                            <Link
                                target="_blank"
                                href="https://admin.applyons.com/auth/sign-in"
                                className="ml-1 text-blueLogo hover:text-blue-800 font-medium transition-colors"
                            >
                                {t("auth.signIn.title")}
                            </Link>
                        </Text>
                    </div>
                </div>
            </div>
        </>
    );
}
