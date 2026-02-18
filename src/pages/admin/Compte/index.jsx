

'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Save, ToggleLeft, ToggleRight, UserPlus2, Search, ChevronRight, ChevronLeft, Loader, Image, Camera } from 'lucide-react';
import { AdminBreadcrumb } from "@/components";
import { useAuthContext } from '../../../context/useAuthContext';
import { createAdminUser, getAllAccounts, modifyAccount, updateActivatedStatus, uploadProfileImage } from '../../../services/userService';
import { toast } from 'sonner';
import { cn } from "@/utils";
import { useTranslation } from "react-i18next";

import avatar from "@/assets/avatar.png";

const AdminCompte = () => {
    const { t } = useTranslation();
    const { isAuthenticated, role, session, demandeur, saveProfilImage, profileImage } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('manage');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [adminUsers, setAdminUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    const [adminUser, setAdminUser] = useState({
        id: session && session.id || null,
        username: session && session.username || null,
        email: session && session.email || null,
        roles: ['ROLE_ADMIN'],
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [newAdmin, setNewAdmin] = useState({
        username: '',
        email: '',
        password: 'password',
        confirmPassword: 'password'
    });

    useEffect(() => {
        fetchAdminUsers();
    }, []);



    const fetchAdminUsers = async () => {
        try {
            const response = await getAllAccounts();
            // //console.log(response);
            setAdminUsers(response);
        } catch (error) {
            console.error(t("adminProfil.error_fetching_admins"), error);
            toast.error(t("adminProfil.error_fetching_admins"));
        }
    };



    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (newAdmin.password !== newAdmin.confirmPassword) {
            alert(t("adminProfil.passwords_do_not_match"));
            return;
        }
        setIsSubmitting(true);
        // //console.log(t("adminProfil.creating_new_admin"), newAdmin);
        try {
            const res = await createAdminUser(newAdmin);
            if (res.error) {
                setError(res.error);
                setIsSubmitting(false);
                return;
            }
            toast.success(t("adminProfil.admin_account_created"));
            setNewAdmin({ username: '', email: '', password: '', confirmPassword: '' });
            setIsSubmitting(false);
        } catch (error) {
            console.error(t("adminProfil.error_creating_admin"), error);
            setIsSubmitting(false);
            toast.error(t("adminProfil.error_creating_admin"));
        }
    };

    const handleToggleUserStatus = async (userId, currentStatus) => {
        setIsToggled(true);
        try {
            const response = await updateActivatedStatus(userId, {
                isActive: currentStatus ? 'desactive' : 'active',
            });
            if (!response.error) {
                toast.success(t(`adminProfil.account_${!currentStatus ? 'deactivated' : 'activated'}`));
            } else {
                toast.error(t("adminProfil.error_changing_status"));
            }
            fetchAdminUsers();
            setIsToggled(false);
        } catch (error) {
            console.error(t("adminProfil.error_changing_status"), error);
            toast.error(t("adminProfil.error_changing_status"));
            setIsToggled(false);
        }
    };

    const filteredAdminUsers = adminUsers.filter(user =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAdminUsers.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AdminBreadcrumb title={t("adminProfil.configuration")} />

            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="container mx-auto px-4 py-8">
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                        <h1 className="text-3xl font-bold text-gray-800">{t("adminProfil.admin_management")}</h1>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={() => setActiveTab('create')}
                                                className="inline-flex items-center gap-x-1.5 rounded-full bg-blueLogo px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-rougeLogo"
                                            >
                                                <UserPlus2 className="h-5 w-5" />
                                                {t("adminProfil.new_admin")}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex border-b border-gray-200">

                                            <button
                                                className={`py-2 px-4 font-medium ${activeTab === 'manage' ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
                                                onClick={() => setActiveTab('manage')}
                                            >
                                                {t("adminProfil.manage_accounts")}
                                            </button>
                                            <button
                                                className={`py-2 px-4 font-medium ${activeTab === 'create' ? 'text-blueLogo border-b-2 border-blueLogo' : 'text-gray-500 hover:text-gray-700'}`}
                                                onClick={() => setActiveTab('create')}
                                            >
                                                {t("adminProfil.create_new_admin")}
                                            </button>
                                        </div>
                                    </div>



                                    {activeTab === 'manage' && (
                                        <div className="p-6">
                                            <div className="flex mb-4">
                                                <div className="relative flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder={t("adminProfil.search_by_username_or_email")}
                                                        value={filter}
                                                        onChange={(e) => setFilter(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>

                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("id")}</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("username")}</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("email")}</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("roles")}</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("status")}</th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t("actions")}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {currentItems.map((user) => (
                                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{user.id}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                    {
                                                                        {
                                                                            'ROLE_ADMIN': t("adminProfil.admin"),
                                                                            'ROLE_DEMANDEUR': t("adminProfil.demandeur"),
                                                                            'ROLE_INSTITUT': t("adminProfil.institut"),
                                                                        }[user.roles[0]]
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span
                                                                        className={cn(
                                                                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                                                            user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                                        )}
                                                                    >
                                                                        {user.isActive ? t("adminProfil.active") : t("adminProfil.inactive")}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                    <button
                                                                        onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                                                                        className={cn(
                                                                            "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                                                            user.isActive ? "text-red-700 bg-red-100 hover:bg-red-200" : "text-green-700 bg-green-100 hover:bg-green-200"
                                                                        )}
                                                                    >
                                                                        {isToggled ? <>
                                                                            <Loader span className="mr-2 animate-spin" ></Loader>
                                                                        </> : <>
                                                                            {user.isActive ? <ToggleLeft className="mr-2" size={16} /> : <ToggleRight className="mr-2" size={16} />}
                                                                            {user.isActive ? t("adminProfil.deactivate") : t("adminProfil.activate")}
                                                                        </>}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="text-sm text-gray-700">
                                                    {t("adminProfil.showing")} {indexOfFirstItem + 1} {t("adminProfil.to")} {Math.min(indexOfLastItem, filteredAdminUsers.length)} {t("adminProfil.of")} {filteredAdminUsers.length} {t("adminProfil.entries")}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => paginate(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className={cn(
                                                            "px-3 py-1 rounded-md",
                                                            currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                                        )}
                                                    >
                                                        <ChevronLeft className="h-5 w-5" />
                                                    </button>
                                                    {Array.from({ length: Math.ceil(filteredAdminUsers.length / itemsPerPage) }).map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => paginate(index + 1)}
                                                            className={cn(
                                                                "px-3 py-1 rounded-md",
                                                                currentPage === index + 1 ? "bg-blueLogo text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                                            )}
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    ))}
                                                    <button
                                                        onClick={() => paginate(currentPage + 1)}
                                                        disabled={currentPage === Math.ceil(filteredAdminUsers.length / itemsPerPage)}
                                                        className={cn(
                                                            "px-3 py-1 rounded-md",
                                                            currentPage === Math.ceil(filteredAdminUsers.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                                        )}
                                                    >
                                                        <ChevronRight className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'create' && (
                                        <div className="p-6">
                                            <h2 className="text-2xl font-semibold mb-4">{t("adminProfil.create_new_admin")}</h2>
                                            <form onSubmit={handleCreateAdmin} className="space-y-4">
                                                <div>
                                                    <label htmlFor="new-username" className="block text-sm font-medium text-gray-700 mb-1">
                                                        {t("adminProfil.username")}
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            id="new-username"
                                                            type="text"
                                                            value={newAdmin.username}
                                                            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                                            required
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">
                                                        {t("adminProfil.email")}
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                        <input
                                                            id="new-email"
                                                            type="email"
                                                            value={newAdmin.email}
                                                            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                                            required
                                                            className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center space-x-4" >

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-1/2 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-rougeLogo focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                                    >
                                                        <UserPlus className="mr-2" size={20} />
                                                        {
                                                            isSubmitting
                                                                ? <> <Loader span className="mr-2 animate-spin" ></Loader>  <span>{t("adminProfil.saving")}</span> </>
                                                                : <>  {t("adminProfil.create_admin")} </>
                                                        }
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminCompte;
