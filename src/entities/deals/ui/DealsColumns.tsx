
import { DealCard } from "./DealCard";
import type { IDeal } from '@/shared/types/deals.types';

interface DealsColumnProps {
    deals: IDeal[];
    type: string;
}

export function DealsColumn({ deals, type }: DealsColumnProps) {
    if (!deals || deals.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#999',
                border: '2px dashed #f0f0f0',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                Нет сделок
            </div>
        );
    }

    return (
        <div style={{
            maxHeight: '600px',
            overflowY: 'auto',
            padding: '4px',
            minHeight: '200px'
        }}>
            {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} type={type} />
            ))}
        </div>
    );
};