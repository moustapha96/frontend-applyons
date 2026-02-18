import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;


const TestimonialCard = ({ quote }) => (
    <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col">
            <span className="text-4xl text-[#1e5b8d] font-serif mb-2">"</span>
            <Paragraph className="text-[#4a5568] italic">
                {quote}
            </Paragraph>
        </div>
    </Card>
);

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Applyons a réduit notre temps de traitement de 60%."
        },
        {
            quote: "Nos utillisateurs adorent la simplicité du processus de depot."
        }
    ];

    return (
        <div className="py-16 px-4 md:px-8 bg-white">
            <div className="max-w-5xl mx-auto">
                <Title level={2} className="text-3xl font-bold text-center text-[#0d2b45] mb-12">
                    Témoignages
                </Title>
                <Row gutter={[24, 24]}>
                    {testimonials.map((testimonial, index) => (
                        <Col xs={24} md={12} key={index}>
                            <TestimonialCard
                                quote={testimonial.quote}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Testimonials;