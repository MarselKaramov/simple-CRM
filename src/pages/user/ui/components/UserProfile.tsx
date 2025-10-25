import { useNavigate, useParams } from 'react-router-dom';
import UserAddressInfo from './UserAddressInfo';
import UserPersonalInfo from './UserPersonalInfo';
import GoBackButton from '@/shared/ui/GoBackButton';

export default function UserProfile() {
    const navigate = useNavigate();
    const { userId } = useParams();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <GoBackButton onClick={navigate} />
            <UserPersonalInfo userId={userId} />
            <UserAddressInfo userId={userId} />
        </div>
    );
}
