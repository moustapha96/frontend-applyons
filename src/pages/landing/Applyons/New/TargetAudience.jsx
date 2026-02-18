import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { GraduationCap, Building2, Building } from 'lucide-react';

const { Title } = Typography;



const AudienceCard = ({ icon, title }) => (
    <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col items-center text-center">
            <div className="text-[#1e5b8d] mb-4">
                {icon}
            </div>
            <Title level={5} className="text-[#0d2b45] m-0">
                {title}
            </Title>
        </div>
    </Card>
);

const TargetAudience = () => {
    const audiences = [
        {
            icon: <GraduationCap size={40} />,
            title: "Ecoles et universités"
        },
        {
            icon: <Building2 size={40} />,
            title: "Services financiers"
        },
        {
            icon: <Building size={40} />,
            title: "Grandes entreprises"
        }
    ];

    return (
        <div className="py-16 px-4 md:px-8 bg-[#f8fafc]">
            <div className="max-w-5xl mx-auto">
                <Title level={2} className="text-3xl font-bold text-center text-[#0d2b45] mb-12">
                    Conçu pour
                </Title>
                <Row gutter={[24, 24]}>
                    {audiences.map((audience, index) => (
                        <Col xs={24} md={8} key={index}>
                            <AudienceCard
                                icon={audience.icon}
                                title={audience.title}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default TargetAudience;