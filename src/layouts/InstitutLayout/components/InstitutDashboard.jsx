import { Row, Col, Card, Statistic, Typography, Table, Button, Space, Divider, List, Avatar } from "antd"
import {
    UserOutlined,
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    BookOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    EllipsisOutlined,
} from "@ant-design/icons"
import { Chart } from "@ant-design/charts"

const { Title, Text } = Typography

const InstitutDashboardExample = () => {
    // Données d'exemple pour les statistiques
    const stats = [
        {
            title: "Demandes totales",
            value: 124,
            icon: <FileTextOutlined />,
            color: "#1677ff",
            increase: 12.5,
        },
        {
            title: "Demandes en cours",
            value: 26,
            icon: <ClockCircleOutlined />,
            color: "#faad14",
            increase: -3.2,
        },
        {
            title: "Demandes approuvées",
            value: 98,
            icon: <CheckCircleOutlined />,
            color: "#52c41a",
            increase: 5.2,
        },
        {
            title: "Étudiants vérifiés",
            value: 1254,
            icon: <UserOutlined />,
            color: "#ff4d4f",
            increase: 8.7,
        },
    ]

    // Données d'exemple pour le tableau
    const tableColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Intitulé",
            dataIndex: "intitule",
            key: "intitule",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Demandeur",
            dataIndex: "demandeur",
            key: "demandeur",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Statut",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = ""
                if (status === "Approuvée") color = "success"
                else if (status === "En attente") color = "warning"
                else color = "error"

                return <Text type={color}>{status}</Text>
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <Space>
                    <Button type="text" size="small">
                        Voir
                    </Button>
                    <Button type="text" size="small">
                        Traiter
                    </Button>
                </Space>
            ),
        },
    ]

    const tableData = [
        {
            key: "1",
            id: "DEM-2023-001",
            intitule: "Attestation de scolarité",
            demandeur: "Jean Dupont",
            date: "12/05/2023",
            status: "Approuvée",
        },
        {
            key: "2",
            id: "DEM-2023-002",
            intitule: "Relevé de notes",
            demandeur: "Marie Martin",
            date: "14/05/2023",
            status: "En attente",
        },
        {
            key: "3",
            id: "DEM-2023-003",
            intitule: "Certificat de diplôme",
            demandeur: "Pierre Durand",
            date: "15/05/2023",
            status: "Approuvée",
        },
        {
            key: "4",
            id: "DEM-2023-004",
            intitule: "Attestation de stage",
            demandeur: "Sophie Petit",
            date: "16/05/2023",
            status: "Rejetée",
        },
    ]

    // Données d'exemple pour le graphique
    const chartData = [
        { mois: "Jan", demandes: 8 },
        { mois: "Fév", demandes: 12 },
        { mois: "Mar", demandes: 9 },
        { mois: "Avr", demandes: 15 },
        { mois: "Mai", demandes: 10 },
        { mois: "Juin", demandes: 14 },
        { mois: "Juil", demandes: 18 },
        { mois: "Août", demandes: 7 },
        { mois: "Sep", demandes: 13 },
        { mois: "Oct", demandes: 11 },
        { mois: "Nov", demandes: 9 },
        { mois: "Déc", demandes: 7 },
    ]

    const config = {
        data: chartData,
        xField: "mois",
        yField: "demandes",
        color: "#1677ff",
        point: {
            size: 5,
            shape: "diamond",
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
    }

    // Données d'exemple pour les activités récentes
    const activities = [
        {
            title: "Nouvelle demande",
            description: "Jean Dupont a soumis une demande d'attestation",
            time: "Il y a 10 minutes",
            avatar: <FileTextOutlined />,
        },
        {
            title: "Demande approuvée",
            description: "Vous avez approuvé la demande de Marie Martin",
            time: "Il y a 30 minutes",
            avatar: <CheckCircleOutlined />,
        },
        {
            title: "Nouvel étudiant",
            description: "Pierre Durand a été ajouté à la base de données",
            time: "Il y a 2 heures",
            avatar: <UserOutlined />,
        },
        {
            title: "Nouveau diplôme",
            description: "Un nouveau diplôme a été ajouté au catalogue",
            time: "Il y a 5 heures",
            avatar: <BookOutlined />,
        },
    ]

    return (
        <div>
            <Title level={2}>Tableau de bord Institut</Title>

            {/* Statistiques */}
            <Row gutter={[16, 16]}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card>
                            <Statistic
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div
                                            style={{
                                                backgroundColor: `${stat.color}15`,
                                                color: stat.color,
                                                padding: "8px",
                                                borderRadius: "8px",
                                                marginRight: "8px",
                                            }}
                                        >
                                            {stat.icon}
                                        </div>
                                        {stat.title}
                                    </div>
                                }
                                value={stat.value}
                                valueStyle={{ color: stat.color }}
                                suffix={
                                    <div style={{ fontSize: "14px", marginLeft: "8px" }}>
                                        {stat.increase > 0 ? (
                                            <Text type="success">
                                                <ArrowUpOutlined /> {stat.increase}%
                                            </Text>
                                        ) : (
                                            <Text type="danger">
                                                <ArrowDownOutlined /> {Math.abs(stat.increase)}%
                                            </Text>
                                        )}
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider />

            {/* Graphique et Activités récentes */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Évolution des demandes" extra={<Button type="text" icon={<EllipsisOutlined />} />}>
                        <Chart {...config} height={300} />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Activités récentes">
                        <List
                            itemLayout="horizontal"
                            dataSource={activities}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={item.avatar} />}
                                        title={item.title}
                                        description={
                                            <>
                                                <div>{item.description}</div>
                                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                                    {item.time}
                                                </Text>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            <Divider />

            {/* Tableau des dernières demandes */}
            <Card title="Dernières demandes" extra={<Button type="primary">Voir tout</Button>}>
                <Table columns={tableColumns} dataSource={tableData} pagination={false} />
            </Card>
        </div>
    )
}

export default InstitutDashboardExample
