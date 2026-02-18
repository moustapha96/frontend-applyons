"use client"
import { Layout, Button, Tabs, Form, Input, Card, Typography, Row, Col, Divider, Menu } from "antd"
import { CheckCircleOutlined, FileTextOutlined, FormOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

import { ConfigProvider } from 'antd';
import HeaderApplyons from "./components/header"
import FooterAppyons from "./components/Footer"
import HeroApplayons from "./components/Hero"
import FeaturesApplayons from "./components/Features"
import PricingApplyons from "./components/Pricing"
import BrandsSection from "./components/brands-section"
import ConcuPourApplyons from "./components/ConcuPour"
import { useTranslation } from "react-i18next"
import Faq from "./components/Faq"
import { LandingLayout } from "@/layouts"

import Hero from './New/Hero';
import Features from './New/Features';
import TargetAudience from './New/TargetAudience';
import Testimonials from './New/Testimonials';
import AppFooter from './New/Footer';
import { PageMetaData } from "@/components";
import AnimateOnScroll from "@/components/AnimateOnScroll";


const { Header, Footer, Content } = Layout
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const theme = {
    token: {
        colorPrimary: '#254c6b',
        borderRadius: 4,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
};


export default function ApplyOnsPage() {
    const { t } = useTranslation()
    const menuItems = [
        { key: "home", label: <a href="#home">{t("nav.home")} </a> },
        { key: "features", label: <a href="#features">{t("nav.features")}</a> },
        { key: "pricing", label: <a href="#pricing">{t("nav.pricings")}</a> },
        { key: "concuPour", label: <a href="#concuPour">{t("nav.concuPour")}</a> }
    ];

    return <>


        <LandingLayout>
            <PageMetaData title="Streamline any application process." />
            <Layout className="min-h-screen">
                {/* <AppHeader /> */}
                <HeaderApplyons menuItems={menuItems} />
                <Content>
                    <section id="home" className="overflow-hidden">
                        <AnimateOnScroll direction="fade">
                            <Hero />
                        </AnimateOnScroll>
                    </section>
                    <section id="features" className="overflow-hidden">
                        <AnimateOnScroll direction="up" delay={100}>
                            <FeaturesApplayons />
                        </AnimateOnScroll>
                    </section>
                    <section id="pricing" className="overflow-hidden">
                        <AnimateOnScroll direction="up" delay={150}>
                            <PricingApplyons />
                        </AnimateOnScroll>
                    </section>
                    <section id="concuPour" className="overflow-hidden">
                        <AnimateOnScroll direction="up" delay={100}>
                            <ConcuPourApplyons />
                        </AnimateOnScroll>
                    </section>
                    <section id="faq" className="overflow-hidden">
                        <AnimateOnScroll direction="up" delay={100}>
                            <Faq />
                        </AnimateOnScroll>
                    </section>
                </Content>
                {/* <AppFooter /> */}
                {/* <FooterAppyons /> */}
            </Layout>
        </LandingLayout>
    </>
}
