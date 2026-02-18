import { LuChevronsRight } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import PageMetaData from "./PageMetaData";
import { useTranslation } from "react-i18next";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons"
import { Button } from "antd";

const AdminBreadcrumb = ({ title, SubTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <PageMetaData title={title} />
      <section className="hidden md:block">
        <div className="container">
          <div className="my-6 rounded-lg border border-default-200 bg-white dark:bg-default-50">
            <div className="flex items-center justify-between p-6">
              <h4 className="text-lg font-medium text-default-900">{title}</h4>

              {SubTitle && <>
                <h5 className="text-lg font-medium text-default-900">{SubTitle}</h5>
              </>}

              <div className="flex items-center justify-end gap-3">
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin/dashboard"
                    className="text-base font-medium text-default-900 transition-all duration-200 hover:text-primary"
                  >
                    Admin
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <LuChevronsRight className="size-5 text-default-900 rtl:rotate-180" />
                  <Link
                    to=""
                    className="text-base font-medium text-default-900"
                  >
                    {title}
                  </Link>
                </div>

              </div>

            </div>
            {window.location.pathname !== "/admin/dashboard" && <>
              <div className="flex items-center justify-end border-b gap-4 border-gray-200 px-6 py-4">
                <Link onClick={() => navigate(-1)}>
                  <Button
                    className="ant-btn-primary"
                    icon={<ArrowLeftOutlined />}
                    size={"small"}
                  >
                    {t("common.back")}
                  </Button>
                </Link>
              </div>
            </>}
          </div>
        </div>
      </section>

      <div className="md:hidden container bg-white dark:bg-default-50">
        {window.location.pathname !== "/admin/dashboard" && <>
          <div className="flex items-center justify-end border-b gap-4 border-gray-200 px-6 py-4">
            <Link onClick={() => navigate(-1)}>
              <Button
                className="bg-blueLogo text-white"
                icon={<ArrowLeftOutlined />}
                // size={isMobileScreen ? "small" : "middle"}
                size={"small"}
              >
                {t("common.back")}
              </Button>
            </Link>
          </div>
        </>}
      </div>
    </>
  );
};

export default AdminBreadcrumb;
