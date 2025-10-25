// components/ui/DealsKanbanBoard.tsx
import { Row, Col, Card, Typography } from 'antd';
import type { ITransformedDeal } from '@/shared/types/deals.types';
import { DealsColumn } from './DealsColumns';

const { Title } = Typography;

interface DealsKanbanBoardProps {
    stagesData: ITransformedDeal;
}

const columnsConfig = [
    { key: 'new', title: '🆕 Новые', color: '#1890ff' },
    { key: 'talk', title: '💬 Переговоры', color: '#faad14' },
    { key: 'done', title: '✅ Выполнено', color: '#52c41a' },
    { key: 'cancel', title: '❌ Отменено', color: '#ff4d4f' },
];

export function DealsKanbanBoard({ stagesData }: DealsKanbanBoardProps) {
    return (
        <Row gutter={[16, 16]} style={{ margin: 0 }}>
            {columnsConfig.map((column) => (
                <Col xs={24} sm={12} lg={6} key={column.key}>
                    <Card
                        size="small"
                        title={
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: column.color
                                    }}
                                />
                                <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
                                    {column.title} ({stagesData[column.key as keyof ITransformedDeal]?.length || 0})
                                </Title>
                            </div>
                        }
                        style={{ height: '100%' }}
                        bodyStyle={{ padding: '8px' }}
                    >
                        <DealsColumn
                            deals={stagesData[column.key as keyof ITransformedDeal]}
                            type={column.key}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
}