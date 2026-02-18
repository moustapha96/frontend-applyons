import React from 'react';
import { Layout, Typography } from 'antd';
import { CheckSquare } from 'lucide-react';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
    return (
        <Footer className=" bg-blueLogo  p-8 text-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <CheckSquare className="w-6 h-6 text-white" />
                        <span className="ml-2 text-lg font-bold">Applyons</span>
                    </div>
                    <Text className="text-white opacity-80">
                        © {new Date().getFullYear()} Applyons. Tous droits réservés.
                    </Text>
                </div>
            </div>
        </Footer>
    );
};

export default AppFooter;