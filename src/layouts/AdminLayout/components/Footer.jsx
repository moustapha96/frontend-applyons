

// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const { t } = useTranslation();

//   return (
//     <footer className="w-full border-t border-default-200 bg-white py-4 dark:bg-default-50">
//       <div className="container">
//         <div className="grid items-center gap-6 lg:grid-cols-2">
//           <p className="text-center text-default-900 lg:text-start">
//             {new Date().getFullYear()} © &nbsp;
//             {/* <span className="text-red-500">❤️</span> by&nbsp; */}
//             <Link
//               className="text-blueLogo text-bold"
//               to="https://www.applyons.com/"
//               target="_blank"
//             >
//               <span className="text-blueLogo" >Authentic</span><span className="text-rougeLogo" >Page</span>
//             </Link>
//           </p>
//           <div className="hidden justify-center gap-6 text-center lg:flex lg:justify-end">
//             <Link to="/terms-and-conditions" target="_blank" className="font-medium text-default-500">
//               {t("footer.conditions")}
//             </Link>
//             <Link to="/privacy-policy" target=" _blank" className="font-medium text-default-500">
//               {t("footer.confidentialite")}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Typography, Space, Row, Col } from "antd"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const { Text } = Typography

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <Row align="middle" justify="space-between" style={{ width: "100%" }}>
      <Col xs={24} lg={12} style={{ textAlign: "center", marginBottom: { xs: 16, lg: 0 } }}>
        <Text>
          {currentYear} ©{" "}
          <Link to="https://applyons.com/" target="_blank">
            <Text strong style={{ color: "#254c6b" }}>
              ApplyOns
            </Text>

          </Link>
        </Text>
      </Col>
      <Col xs={24} lg={12} style={{ textAlign: { xs: "center", lg: "right" } }}>
        <Space size="large">
          <Link to="/terms-and-conditions" target="_blank">
            <Text>{t("footer.conditions")}</Text>
          </Link>
          <Link to="/privacy-policy" target="_blank">
            <Text>{t("footer.confidentialite")}</Text>
          </Link>
        </Space>
      </Col>
    </Row>
  )
}

export default Footer
