import { useFetchPersonalInfoQuery } from '@/entities/user-info/services/user-info.api';
import { getCategory } from '@/shared/helpers/getCategory';
import { Avatar, Card, Col, Row, Space, Tag } from 'antd';
import { CiMail } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { MdOutlineMan, MdOutlineWoman2 } from 'react-icons/md';
import { useSearchParams } from 'react-router';

export default function UserPersonalInfo() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId') ?? '';
    const { data: userPersonalData } = useFetchPersonalInfoQuery(userId);

    if (!userPersonalData) {
        return (
            <Card style={{ maxWidth: 600 }}>
                <div style={{ textAlign: 'center', color: '#999' }}>Данные не указаны</div>
            </Card>
        );
    }
    console.log(userPersonalData);
    const { id, gender, first_name, last_name, email, category } = userPersonalData;

    const { title: categoryTitle, color: categoryColor } = getCategory(category);

    return (
        <div>
            <Card style={{ maxWidth: 600 }}>
                <Row
                    gutter={[24, 16]}
                    align='middle'
                >
                    {/* Аватар */}
                    <Col
                        xs={24}
                        sm={6}
                        style={{ textAlign: 'center' }}
                    >
                        <Avatar
                            size={80}
                            icon={<FaUser />}
                            style={{
                                backgroundColor: gender === 'man' ? '#1890ff' : '#eb2f96',
                            }}
                        />
                    </Col>

                    {/* Основная информация */}
                    <Col
                        xs={24}
                        sm={18}
                    >
                        <Space
                            direction='vertical'
                            style={{ width: '100%' }}
                            size='small'
                        >
                            <h3 style={{ margin: 0 }}>
                                {first_name} {last_name}
                            </h3>

                            <Space
                                size='middle'
                                wrap
                            >
                                <Space>
                                    <CiMail />
                                    <p>{email}</p>
                                </Space>

                                <Space>
                                    {gender === 'man' ? <MdOutlineMan style={{ color: '#1890ff' }} /> : <MdOutlineWoman2 style={{ color: '#eb2f96' }} />}
                                    <Tag color={gender === 'man' ? 'blue' : 'pink'}>{gender === 'man' ? 'Мужской' : 'Женский'}</Tag>
                                </Space>

                                <Tag>ID: {id}</Tag>

                                <Space>
                                    <Tag color={categoryColor}>{categoryTitle}</Tag>
                                </Space>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}
