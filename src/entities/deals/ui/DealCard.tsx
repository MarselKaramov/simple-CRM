import { ROUTES } from "@/processes/routing/config/routes";
import type { IDeal } from "@/shared/types/deals.types";
import { Card, Flex, Space, Tag, Typography } from "antd";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const { Text, Paragraph } = Typography;

export function DealCard({ deal, type }: { deal: IDeal; type: string }) {
    const getPriorityColor = (priority: string) => {
        const prio = priority?.toLowerCase();
        if (prio === 'высокий' || prio === 'high') return 'red';
        if (prio === 'средний') return 'orange';
        if (prio === 'низкий') return 'green';
        return 'blue';
    };

    const getTypeInfo = () => {
        switch (type) {
            case 'new':
                return { color: '#1890ff', label: '🆕 Новый', title: 'Новые' };
            case 'talk':
                return { color: '#faad14', label: '💬 В переговорах', title: 'Переговоры' };
            case 'done':
                return { color: '#52c41a', label: '✅ Выполнено', title: 'Выполнено' };
            case 'cancel':
                return { color: '#ff4d4f', label: '❌ Отменено', title: 'Отменено' };
            default:
                return { color: '#d9d9d9', label: '', title: '' };
        }
    };

    const typeInfo = getTypeInfo();
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate(`${ROUTES.USER}?userId=${deal.client_id}`);
    // };

    return (
        <Card
            size="small"
            style={{
                marginBottom: '12px',
                borderLeft: `4px solid ${typeInfo.color}`,
            }}
        >
            <Flex vertical>
                <Text strong style={{ fontSize: '14px' }}>{deal.title}</Text>
                <Tag color={getPriorityColor(deal.priority)} style={{ textAlign: 'center' }}>
                    {deal.priority}
                </Tag>
            </Flex>

            <Paragraph
                ellipsis={{ rows: 2 }}
                style={{ fontSize: '12px', marginBottom: '8px', color: '#666' }}
            >
                {deal.description}
            </Paragraph>

            <Space direction="vertical" size={2} style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Text type="secondary" style={{ fontSize: '11px' }}>Бюджет:</Text>
                    <Text strong style={{ fontSize: '11px' }}>
                        {deal.budget?.toLocaleString()} руб.
                    </Text>
                </Flex>

                <Flex justify="space-between">
                    <Text type="secondary" style={{ fontSize: '11px' }}>Дата закрытия:</Text>
                    <Text style={{ fontSize: '11px' }}>
                        {new Date(deal.expected_close_date).toLocaleDateString('ru-RU')}
                    </Text>
                </Flex>

                <Flex justify="space-between" align="center">
                    <Text type="secondary" style={{ fontSize: '11px' }}>Клиент ID:</Text>

                    <Link
                        to={`${ROUTES.USER}/${deal.client_id}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none'
                        }}
                    >
                        <Text style={{ fontSize: '11px' }}>{deal.client_id}</Text>
                        <AiOutlineArrowRight style={{ cursor: 'pointer' }} />
                    </Link>
                </Flex>
            </Space>

            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0f0f0' }}>
                <Tag color={typeInfo.color} style={{ fontSize: '11px' }}>
                    {typeInfo.label}
                </Tag>
            </div>
        </Card>
    );
};