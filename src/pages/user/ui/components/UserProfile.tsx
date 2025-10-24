import { useNavigate } from 'react-router';
import UserAddressInfo from './UserAddressInfo';
import UserPersonalInfo from './UserPersonalInfo';
import GoBackButton from '@/shared/ui/GoBackButton';

export default function UserProfile() {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GoBackButton onClick={navigate} />
            <UserPersonalInfo />
            <UserAddressInfo />
        </div>
    );
}
