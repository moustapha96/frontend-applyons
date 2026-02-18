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
