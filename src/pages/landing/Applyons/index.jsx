"use client"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Layout, Button, Tabs, Form, Input, Card, Typography, Row, Col, Divider, Menu } from "antd"
import { CheckCircleOutlined, FileTextOutlined, FormOutlined, ClockCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

import { ConfigProvider } from 'antd';
import HeaderApplyons from "./components/Header"
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


import { getApplyonsMenuItems } from "./navConfig"

export default function ApplyOnsPage() {
    const { t } = useTranslation()
    const location = useLocation()
    const menuItems = getApplyonsMenuItems(t)

    useEffect(() => {
        const hash = location.hash || window.location.hash
        if (hash) {
            const id = hash.replace("#", "")
            const el = document.getElementById(id)
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
        }
    }, [location.pathname, location.hash])

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
                    <section id="testimonials" className="overflow-hidden">
                        <AnimateOnScroll direction="up" delay={100}>
                            <Testimonials />
                        </AnimateOnScroll>
                    </section>
                </Content>
            </Layout>
        </LandingLayout>
    </>
}
