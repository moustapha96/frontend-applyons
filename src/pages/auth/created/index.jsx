import { PageMetaData } from "@/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons"
const AccountCreated = () => {
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [searchParams] = useSearchParams(); // Correctly destructure useSearchParams

    // Use searchParams to get the query parameters
    const initialStatus = searchParams.get("status");
    const initialMessage = searchParams.get("message");

    const [resultat, setResultat] = useState(initialMessage || "");
    const [success, setSuccess] = useState(initialStatus === "success");

    useEffect(() => {
        if (initialStatus === "success" && initialMessage) {
            setLoading(false);
            setResultat(initialMessage);
            setSuccess(true);
        } else {
            setLoading(false);
            setResultat(t("auth.activatedAccount.invalidAccess"));
            setSuccess(false);
        }
    }, [initialStatus, initialMessage, t]);

    return (
        <>
            <PageMetaData title={t("auth.activatedAccount.title")} />
            <div
                style={{
                    minHeight: "70vh",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    padding: "48px 24px",
                }}
            >
                <div className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        {t("auth.activatedAccount.title")}
                    </h2>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        {!loading && success && (
                            <div className="flex flex-col items-center">
                                <CheckCircleOutlined className="text-green-500 h-16 w-16 mb-4" />
                                <p className="text-gray-700 font-medium">    {t(`${resultat}`)} </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {t("auth.activatedAccount.redirecting")}
                                </p>
                            </div>
                        )}
                        {!loading && !success && (
                            <div className="flex flex-col items-center">
                                <CloseCircleOutlined className="text-red-500 h-16 w-16 mb-4" />
                                <p className="text-gray-700 font-medium"> {t(`${resultat}`)} </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {t("auth.activatedAccount.alreadyHaveAccount")}
                        <Link to="/auth/sign-in" className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
                            {t("auth.activatedAccount.signIn")}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AccountCreated;
