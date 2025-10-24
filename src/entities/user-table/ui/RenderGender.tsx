import { Tag } from 'antd';
import { GENDER_CONFIG } from '../config/config';

export const renderGender = function (gender: string) {
    const config = GENDER_CONFIG[gender as keyof typeof GENDER_CONFIG];
    return config ? <Tag color={config.color}>{config.label}</Tag> : gender;
};
