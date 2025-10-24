import { Flex, Tag, Typography } from 'antd';
import { CATEGORY_CONFIG } from '../config/config';

export const renderCategory = function (category: string) {
    const config = CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG];
    if (!config) return category;

    return (
        <Flex
            align='center'
            gap={4}
        >
            <Tag color={config.color}>{category}</Tag>
            <Typography.Paragraph
                type='secondary'
                style={{ fontSize: '12px' }}
            >
                {config.label}
            </Typography.Paragraph>
        </Flex>
    );
};
