import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { menuItems } from '../../shared/types/layout.types';

const { Content, Sider } = Layout;

export default function MainLayout() {
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Sider
                width={200}
                style={{ background: '#fff', borderRight: '1px solid #e5e5e5' }}
            >
                <Menu
                    mode='inline'
                    defaultSelectedKeys={[location.pathname]}
                    items={menuItems.map((item) => ({
                        key: item.key,
                        label: <Link to={item.key}>{item.label}</Link>,
                    }))}
                    style={{ height: '100%', borderInlineEnd: 0, borderRadius: '8px 0 0 8px' }}
                />
            </Sider>
            <Layout style={{ padding: '0 24px 24px', background: '#f0f2f5' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
