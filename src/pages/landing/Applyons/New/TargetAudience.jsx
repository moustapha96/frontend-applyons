import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { GraduationCap, Building2, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;



const AudienceCard = ({ icon, title }) => (
    <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300 dark:!bg-slate-800 dark:!border-slate-700">
        <div className="flex flex-col items-center text-center">
            <div className="text-[#1e5b8d] dark:text-blue-300 mb-4">
                {icon}
            </div>
            <Title level={5} className="text-[#0d2b45] dark:!text-gray-100 m-0">
                {title}
            </Title>
        </div>
    </Card>
);

const TargetAudience = () => {
    const { t } = useTranslation();

    const translatedAudiences = t('applyons_targetAudience.items', { returnObjects: true });

    const audiences = [
        {
            icon: <GraduationCap size={40} />,
            ...(translatedAudiences?.[0] || {})
        },
        {
            icon: <Building2 size={40} />,
            ...(translatedAudiences?.[1] || {})
        },
        {
            icon: <Building size={40} />,
            ...(translatedAudiences?.[2] || {})
        }
    ];

    return (
        <div className="py-16 px-4 md:px-8 bg-[#f8fafc] dark:bg-slate-900">
            <div className="max-w-5xl mx-auto">
                <Title level={2} className="text-3xl font-bold text-center text-[#0d2b45] dark:text-gray-100 mb-12">
                    {t('applyons_targetAudience.title')}
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