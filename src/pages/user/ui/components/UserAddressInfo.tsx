import { useFetchUserByIdQuery } from '@/entities/user-info/services/user-info.api';
import { Card, Descriptions, Flex, Space, Spin, Tag } from 'antd';
import { AiFillEnvironment } from 'react-icons/ai'
import { LoadingOutlined } from '@ant-design/icons';

interface UserAddressInfoProps {
    userId?: string
}

export default function UserAddressInfo({ userId }: UserAddressInfoProps) {
    const { data: userAdressInfo, isLoading, error } = useFetchUserByIdQuery(userId || '');

    if (error) console.log(error);

    if (!userAdressInfo) {
        return (
            <Card style={{ maxWidth: 600 }}>
                <Flex vertical gap='16px' align='center'>
                    <div style={{ textAlign: 'center', color: '#999' }}>Адрес не указан</div>

                </Flex>
            </Card>
        );
    }

    const { street, building_number, city, country, isActive } = userAdressInfo;

    return (
        <>
            {
                isLoading && <Flex
                    align='center'
                    justify='center'
                >
                    <Spin indicator={<LoadingOutlined spin />} />
                </Flex>
            }
            <Card
                title={
                    <Space>
                        <AiFillEnvironment />
                        Информация об адресе
                    </Space>
                }
                style={{ maxWidth: 600 }}
            >
                <Descriptions
                    column={1}
                    bordered
                    size='middle'
                >
                    <Descriptions.Item label={<Space>Адрес</Space>}>
                        {street}, {building_number}
                    </Descriptions.Item>

                    <Descriptions.Item label={<Space>Город</Space>}>{city}</Descriptions.Item>

                    <Descriptions.Item label={<Space>Страна</Space>}>{country}</Descriptions.Item>

                    <Descriptions.Item label={<Space>Статус</Space>}>
                        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Активен' : 'Неактивен'}</Tag>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
}
