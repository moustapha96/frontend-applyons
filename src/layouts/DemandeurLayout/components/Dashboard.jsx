import { Row, Col, Card, Statistic, Typography, List, Button, Space, Divider, Tag, Steps, Avatar } from "antd"
import {
    FileTextOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    MessageOutlined,
    BellOutlined,
} from "@ant-design/icons"
import { Chart } from "@ant-design/charts"

const { Title, Text, Paragraph } = Typography
const { Step } = Steps

const DemandeurDashboard = () => {
    // Données d'exemple pour les statistiques
    const stats = [
        {
            title: "Demandes totales",
            value: 12,
            icon: <FileTextOutlined />,
            color: "#1677ff",
        },
        {
            title: "Demandes en cours",
            value: 5,
            icon: <ClockCircleOutlined />,
            color: "#faad14",
        },
        {
            title: "Demandes approuvées",
            value: 6,
            icon: <CheckCircleOutlined />,
            color: "#52c41a",
        },
        {
            title: "Demandes rejetées",
            value: 1,
            icon: <ExclamationCircleOutlined />,
            color: "#ff4d4f",
        },
    ]

    // Données d'exemple pour le graphique
    const chartData = [
        { mois: "Jan", demandes: 1 },
        { mois: "Fév", demandes: 2 },
        { mois: "Mar", demandes: 0 },
        { mois: "Avr", demandes: 3 },
        { mois: "Mai", demandes: 1 },
        { mois: "Juin", demandes: 2 },
        { mois: "Juil", demandes: 1 },
        { mois: "Août", demandes: 0 },
        { mois: "Sep", demandes: 1 },
        { mois: "Oct", demandes: 0 },
        { mois: "Nov", demandes: 1 },
        { mois: "Déc", demandes: 0 },
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

    // Données d'exemple pour les demandes récentes
    const recentDemandes = [
        {
            id: "DEM-2023-001",
            title: "Demande de congé",
            date: "12/05/2023",
            status: "Approuvée",
            statusColor: "success",
        },
        {
            id: "DEM-2023-002",
            title: "Demande de formation",
            date: "23/06/2023",
            status: "En cours",
            statusColor: "processing",
        },
        {
            id: "DEM-2023-003",
            title: "Demande de matériel",
            date: "05/07/2023",
            status: "Approuvée",
            statusColor: "success",
        },
        {
            id: "DEM-2023-004",
            title: "Demande de remboursement",
            date: "18/08/2023",
            status: "Rejetée",
            statusColor: "error",
        },
        {
            id: "DEM-2023-005",
            title: "Demande d'avance",
            date: "02/10/2023",
            status: "En cours",
            statusColor: "processing",
        },
    ]

    // Données d'exemple pour les notifications
    const notifications = [
        {
            title: "Votre demande a été approuvée",
            description: "La demande DEM-2023-001 a été approuvée",
            time: "Il y a 2 jours",
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
        },
        {
            title: "Nouveau message",
            description: "Vous avez reçu un nouveau message concernant votre demande",
            time: "Il y a 3 jours",
            icon: <MessageOutlined style={{ color: "#1677ff" }} />,
        },
        {
            title: "Rappel",
            description: "N'oubliez pas de compléter votre profil",
            time: "Il y a 5 jours",
            icon: <BellOutlined style={{ color: "#faad14" }} />,
        },
    ]

    return (
        <div>
            <Title level={2}>Tableau de bord</Title>

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
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider />

            {/* Graphique et Notifications */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card title="Historique des demandes">
                        <Chart {...config} height={300} />
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Notifications récentes" extra={<Button type="link">Voir tout</Button>}>
                        <List
                            itemLayout="horizontal"
                            dataSource={notifications}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={item.icon} style={{ backgroundColor: "transparent" }} />}
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

            {/* Demandes récentes */}
            <Card title="Demandes récentes" extra={<Button type="primary">Nouvelle demande</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={recentDemandes}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button type="link" key="view">
                                    Voir
                                </Button>,
                                <Button type="link" key="edit">
                                    Modifier
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <Space>
                                        <Text strong>{item.title}</Text>
                                        <Tag color={item.statusColor}>{item.status}</Tag>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical">
                                        <Text type="secondary">ID: {item.id}</Text>
                                        <Text type="secondary">Date: {item.date}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>

            <Divider />

            {/* Suivi de demande */}
            <Card title="Suivi de votre dernière demande">
                <Steps
                    current={2}
                    items={[
                        {
                            title: "Soumise",
                            description: "02/10/2023",
                            icon: <FileTextOutlined />,
                        },
                        {
                            title: "En traitement",
                            description: "05/10/2023",
                            icon: <ClockCircleOutlined />,
                        },
                        {
                            title: "En révision",
                            description: "En cours",
                            icon: <UserOutlined />,
                        },
                        {
                            title: "Décision finale",
                            description: "En attente",
                            icon: <CheckCircleOutlined />,
                        },
                    ]}
                />
            </Card>
        </div>
    )
}

export default DemandeurDashboard
