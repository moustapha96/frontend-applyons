import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { CheckSquare } from 'lucide-react';

const { Header } = Layout;

const AppHeader = () => {
    const menuItems = [
        {
            key: 'features',
            label: 'Fonctionnalités',
        },
        {
            key: 'pricing',
            label: 'Tarification',
        },
        {
            key: 'for',
            label: 'Conçu pour',
        },
        {
            key: 'login',
            label: 'Connexion',
        },
    ];

    return (
        <Header className="bg-white h-16 px-4 md:px-8 flex items-center justify-between fixed w-full z-10 shadow-sm">
            <div className="flex items-center">
                <div className="flex items-center mr-4">
                    <CheckSquare className="w-8 h-8 text-[#1e5b8d]" />
                    <span className="ml-2 text-xl font-bold text-[#1e5b8d]">Applyons</span>
                </div>
                <div className="hidden md:block">
                    <Menu
                        mode="horizontal"
                        className="border-0"
                        selectedKeys={[]}
                        items={menuItems}
                    />
                </div>
            </div>
            <div className="block md:hidden">
                <Button type="text">☰</Button>
            </div>
        </Header>
    );
};

export default AppHeader;