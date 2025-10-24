import { useGetAnalyticsCategoryQuery } from '@/entities/analytics/services/analytics.api';
import { countCategories } from '@/shared/helpers/countCategories';
import { COLORS } from '@/shared/types/analytics.types';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function CategoryAnalytics() {
    const { data } = useGetAnalyticsCategoryQuery();
    const countedCategories = countCategories(data || []);

    return (
        <div style={{ padding: '16px' }}>
            <Title level={2}>Аналитика по категориям</Title>

            <Row
                gutter={[16, 16]}
                align='middle'
            >
                <Col
                    xs={24}
                    md={12}
                    lg={10}
                >
                    <Card title='Все категории'>
                        <ResponsiveContainer
                            width='100%'
                            height={200}
                        >
                            <PieChart>
                                <Pie
                                    data={countedCategories}
                                    cx='50%'
                                    cy='50%'
                                    outerRadius={60}
                                    innerRadius={20}
                                    dataKey='value'
                                >
                                    {countedCategories.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[entry.name as keyof typeof COLORS]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout='vertical'
                                    align='right'
                                    verticalAlign='middle'
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>

                <Col
                    xs={24}
                    md={12}
                    lg={14}
                >
                    <Row gutter={[8, 8]}>
                        {countedCategories.map((category) => (
                            <Col
                                xs={12}
                                key={category.name}
                            >
                                <Card
                                    size='small'
                                    style={{ textAlign: 'center' }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                backgroundColor: COLORS[category.name as keyof typeof COLORS],
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Typography.Text>
                                            <strong>Категория</strong> {category.name}
                                        </Typography.Text>
                                    </div>
                                    <Title
                                        level={3}
                                        style={{ margin: '8px 0' }}
                                    >
                                        {category.value}
                                    </Title>
                                    <p>пользователей</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
