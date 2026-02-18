
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminBreadcrumb } from "@/components";
import { getDemandeur, getDemandeurSimple } from "../../../services/demandeurService";
import { CopyableField } from "@/utils/CopyableField";
import { getDemandePartageDemandeur, getDocumentPartageDemandeur } from "@/services/partageService";

import { User, Phone, Mail, MapPin, Briefcase, Calendar, MapPinned, CheckCircle, XCircle, Clock, ChevronRight, Key } from "lucide-react";

import { message, Tabs, Form, Input, Select, Button, Card, Table, Spin, Tag, Space, Popover } from "antd"
import { PlusOutlined, SearchOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons"
import DemandeurBreadcrumb from "../../../components/DemandeurBreadcrumb"
import { getInstitutsSimple } from "@/services/institutService"
import { useNavigate } from "react-router-dom"
import { CopyableFieldSimple } from "@/utils/CopyableField"


const DemandeurDetails = () => {
    const { id } = useParams();
    const [demandeur, setDemandeur] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    const [demandes, setDemandes] = useState([])
    const [instituts, setInstituts] = useState([])
    const [searchText, setSearchText] = useState("")
    const [form] = Form.useForm()
    const { t } = useTranslation()
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)
    const [years, setYears] = useState([])
    const [filterPeriode, setFilterPeriode] = useState(null)
    const [filterYear, setFilterYear] = useState(null)
    const [uniquePeriodes, setUniquePeriodes] = useState([])
    const [uniqueYears, setUniqueYears] = useState([])


    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const years = Array.from({ length: 10 }, (_, i) => currentYear + i)
        setYears(years)
        //console.log(years)
    }, [])
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const fetchDemandeur = async () => {
            try {
                // const data = await getDemandeur(id);
                const demoData = await getDemandePartageDemandeur(id);
                //console.log(demoData);
                setDemandeur(demoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchDemandes = async () => {
            try {
                const data = await getDemandePartageDemandeur(id)
                setDemandes(data)
                extractUniqueFilters(data)
                //console.log(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchDemandes();
        fetchDemandeur();
    }, [id]);

    const extractUniqueFilters = (data) => {
        const periodes = [...new Set(data.map((item) => item.periode))].sort()
        const years = [...new Set(data.map((item) => item.year))].sort((a, b) => b - a)

        setUniquePeriodes(periodes)
        setUniqueYears(years)
    }

    const handlePeriodeFilter = (periode) => {
        setFilterPeriode(periode)
    }

    const handleYearFilter = (year) => {
        setFilterYear(year)
    }

    const resetFilters = () => {
        setFilterPeriode(null)
        setFilterYear(null)
    }

    const getFilteredData = () => {
        return demandes.filter((item) => {
            const matchesSearch =
                item.code.toLowerCase().includes(searchText.toLowerCase()) ||
                item.institut.name.toLowerCase().includes(searchText.toLowerCase())

            const matchesPeriode = filterPeriode ? item.periode === filterPeriode : true
            const matchesYear = filterYear ? item.year === filterYear : true

            return matchesSearch && matchesPeriode && matchesYear
        })
    }

    const translatePeriode = (periode) => {
        switch (periode) {
            case "Printemps":
                return t("demandePartage.periode_1")
            case "Été":
                return t("demandePartage.periode_2")
            case "Automne":
                return t("demandePartage.periode_3")
            case "Hiver":
                return t("demandePartage.periode_4")
            case "Autre":
                return t("demandePartage.periode_5")
            default:
                return periode
        }
    }

    const getResponsiveColumns = () => {
        const baseColumns = [
            {
                title: t("demandeurPartage.code"),
                dataIndex: "code",
                key: "code",
                render: (_, record) => (
                    <Tag color="blue">
                        <CopyableFieldSimple value={record.code} />
                    </Tag>
                ),
                sorter: (a, b) => a.code.localeCompare(b.code),
            },

            {
                title: t("demandePartage.periode"),
                dataIndex: "periode",
                key: "periode",
                render: (_, record) => (
                    <Tag color="blue">
                        {translatePeriode(record.periode)} - {record.year}
                    </Tag>
                ),
                sorter: (a, b) => a.periode - b.periode,
            },
            {
                title: t("demandeurPartage.request_date"),
                dataIndex: "dateDemande",
                key: "dateDemande",
                render: (date) => new Date(date).toLocaleDateString(),
                sorter: (a, b) => new Date(a.dateDemande) - new Date(b.dateDemande),
                responsive: ["md"],
            },
            {
                title: t("demandeurPartage.institute"),
                dataIndex: "institut",
                key: "institut",
                render: (_, record) =>
                    record.institut ? (
                        <Link
                            to={`/demandeur/institut/${record.institut.id}/details`}
                            className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
                        >
                            {record.institut.name}
                        </Link>
                    ) : (
                        "N/A"
                    ),
                sorter: (a, b) => a.institut?.name.localeCompare(b.institut?.name),
            },
            {
                title: t("demandeurPartage.documents"),
                dataIndex: "documentPartages",
                key: "documentPartages",
                render: (_, record) => (
                    <>
                        {record.documentPartages.length > 0 ? (
                            <>
                                <Link to={`/demandeur/partages/${record.id}/details#documents`}>
                                    <Tag color="blue">
                                        {record.documentPartages.length} {windowWidth >= 768 ? t("demandeurPartage.document_count") : ""}
                                    </Tag>
                                </Link>
                            </>
                        ) : (
                            <Tag color="red"> {t("common.no_documents")} </Tag>
                        )}
                    </>
                ),
                responsive: ["md"],
            },
            {
                title: t("demandeurPartage.actions"),
                key: "actions",
                render: (_, record) => (
                    <Space size="small" wrap>
                        <Link
                            to={`/demandeur/partages/${record.id}/details`}
                            className="text-primary hover:text-primary-light transition-colors duration-200 flex items-center gap-1"
                        >
                            <Button
                                className="bg-blueLogo text-white hover:bg-rougeLogo"
                                style={{ marginTop: windowWidth < 576 ? "10px" : "0" }}
                                icon={<EyeOutlined />}
                                title={t("demandeurPartage.view_request_details")}
                                size={windowWidth < 768 ? "small" : "middle"}
                            >
                                {windowWidth >= 576 ? t("demandeurPartage.details") : ""}
                            </Button>


                        </Link>

                        <Popover
                            content={
                                <div style={{ maxWidth: "400px" }}>
                                    <Space direction="vertical">
                                        <div>
                                            <strong>{t("demandeurPartage.institute")}:</strong>
                                            <p>{record.institut.name}</p>
                                            <p>
                                                {record.institut.type} - {record.institut.paysResidence}
                                            </p>
                                            <p>
                                                {t("demandeurPartage.email")}: {record.institut.email}
                                            </p>
                                            <p>
                                                {t("demandeurPartage.phone")}: {record.institut.phone}
                                            </p>
                                        </div>
                                        {record.documentPartages.length > 0 && (
                                            <div>
                                                <strong>{t("demandeurPartage.documents")}:</strong>
                                                {record.documentPartages.map((doc, index) => (
                                                    <div key={index} style={{ marginTop: "8px" }}>
                                                        <p>
                                                            {doc.intitule} - {doc.typeDocument}
                                                        </p>
                                                        <p>
                                                            {t("demandeurPartage.dna_code")}: {doc.codeAdn}
                                                        </p>
                                                        <Tag color={doc.statut === "ACCEPTED" ? "success" : "processing"}>
                                                            {t(`demandeurPartage.status.${doc.statut.toLowerCase()}`)}
                                                        </Tag>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Space>
                                </div>
                            }
                            title={t("demandeurPartage.request_details")}
                            trigger="click"
                            placement="right"
                        >
                            <Button className="bg-blueLogo text-white hover:bg-rougeLogo" icon={<InfoCircleOutlined />} size={windowWidth < 768 ? "small" : "middle"} />
                        </Popover>
                    </Space>
                ),
            },
        ]

        return baseColumns
    }

    const columns = getResponsiveColumns()

    const tableContainerStyle = {
        overflowX: "auto",
        width: "100%",
        maxWidth: "100%",
    }


    if (loading) return <div className="flex justify-center items-center h-screen">{t('common.loading')} </div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-600"> {t('common.error')} : {error}</div>;

    return (
        <>
            <AdminBreadcrumb title="Détails Demandeur" SubTitle={demandeur?.name} />
            <section >
                <div className="container">
                    <div className="my-6 space-y-6">


                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 sm:p-10">
                                <h1 className="text-3xl font-bold text-gray-800 mb-6">{demandeur.name}</h1>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <InfoCard title="Informations Personnelles">
                                        <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date de Naissance" value={new Date(demandeur.dateNaissance).toLocaleDateString()} />
                                        <InfoItem icon={<MapPinned className="w-5 h-5" />} label="Lieu de Naissance" value={demandeur.lieuNaissance} />
                                        <InfoItem icon={<Briefcase className="w-5 h-5" />} label="Profession" value={demandeur.profession} />
                                        <InfoItem icon={<User className="w-5 h-5" />} label="Sexe" value={demandeur.sexe} />
                                        {/* <InfoItem icon={<User className="w-5 h-5" />} label="Numéro D'identification" value={demandeur.codeUser} /> */}
                                        <CopyableField icon={<Key className="w-5 h-5" />} label={"Numéro D'identification"} value={demandeur.codeUser} />

                                    </InfoCard>

                                    <InfoCard title="Contact">
                                        <InfoItem icon={<Phone className="w-5 h-5" />} label="Téléphone" value={demandeur.phone} />
                                        <InfoItem icon={<Mail className="w-5 h-5" />} label="Email" value={demandeur.email} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label="Adresse" value={demandeur.adresse} />
                                        <InfoItem icon={<MapPin className="w-5 h-5" />} label="Pays de Résidence" value={demandeur.paysResidence} />
                                    </InfoCard>
                                </div>

                                {demandeur.demandes && demandeur.demandes.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Demandes Associées</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intitulé</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de Demande</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Résultat</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {demandeur.demandes.map((demande) => (
                                                        <tr key={demande.id} className="hover:bg-gray-50 transition duration-300">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{demande.intitule}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(demande.dateDemande).toLocaleDateString()}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${demande.resultat === "Accepted" ? "bg-green-100 text-green-800" :
                                                                    demande.resultat === "Declined" ? "bg-red-100 text-red-800" :
                                                                        "bg-yellow-100 text-yellow-800"
                                                                    }`}>
                                                                    {demande.resultat === "Accepted" && <CheckCircle className="w-4 h-4 mr-1" />}
                                                                    {demande.resultat === "Declined" && <XCircle className="w-4 h-4 mr-1" />}
                                                                    {demande.resultat === "Pending" && <Clock className="w-4 h-4 mr-1" />}
                                                                    {demande.resultat}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link to={`/admin/demandes/${demande.id}/details`} className="text-blue-600 hover:text-blue-900 flex items-center">
                                                                    Détails
                                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

const InfoCard = ({ title, children }) => (
    <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-blue-500">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-sm text-gray-800">{value || "N/A"}</p>
        </div>
    </div>
);

export default DemandeurDetails;