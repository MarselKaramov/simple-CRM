import { IoMdArrowRoundBack } from 'react-icons/io';

interface GoBackButtonProps {
    onClick: (number: number) => void;
}

export default function GoBackButton({ onClick }: GoBackButtonProps) {
    return (
        <IoMdArrowRoundBack
            onClick={() => onClick(-1)}
            style={{
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                color: '#1890ff',
                transition: 'all 0.3s ease',
                padding: '4px',
                borderRadius: '6px',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = '#40a9ff';
                e.currentTarget.style.backgroundColor = '#f0f8ff';
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1890ff';
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
            }}
        />
    );
}
