import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { Zap, CheckCircle, ThumbsUp } from 'lucide-react';

const { Title, Paragraph } = Typography;


const FeatureCard = ({ icon, title, description }) => (
    <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-[#1e5b8d] mb-4">
                {icon}
            </div>
            <Title level={4} className="text-[#0d2b45] mb-2">
                {title}
            </Title>
            <Paragraph className="text-[#4a5568]">
                {description}
            </Paragraph>
        </div>
    </Card>
);

const Features = () => {
    const features = [
        {
            icon: <Zap size={40} />,
            title: "Mises à jour en temps réel",
            description: "Vérifications de documents par IA formulaires"
        },
        {
            icon: <CheckCircle size={40} />,
            title: "Vérification instantanée",
            description: "Verifications et validations automatiques"
        },
        {
            icon: <ThumbsUp size={40} />,
            title: "Approbation",
            description: "Processus d'aprobation fluide et traçable"
        }
    ];

    return (
        <div className="py-16 px-4 md:px-8 bg-white">
            <div className="w-full overflow-hidden  bg-gradient-to-b from-[#aed3e7] to-white">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="w-full h-16 md:h-24"
                >
                    <path
                        d="M0,120 C600,0 600,0 1200,120 L1200,0 L0,0 Z"
                        className="fill-white"
                    />
                </svg>
            </div>


            <div className="max-w-5xl mx-auto">
                <Title level={2} className="text-3xl font-bold text-center text-[#0d2b45] mb-12">
                    Fonctionnalités
                </Title>
                <Row gutter={[24, 24]}>
                    {features.map((feature, index) => (
                        <Col xs={24} md={8} key={index}>
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Features;