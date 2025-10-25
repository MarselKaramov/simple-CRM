
import { Alert, Flex, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { transformDealsData } from "@/shared/helpers/transformDealsData";
import { useGetDealsQuery } from "@/entities/deals/services/deals.api";
import { useMemo } from "react";
import { DealsKanbanBoard } from "@/entities/deals/ui/DealsCanbanBoard";


export default function DealsPage() {
    const { data: deals, isLoading, error } = useGetDealsQuery();

    const stagesData = useMemo(() => {
        if (!deals) {
            return { new: [], talk: [], done: [], cancel: [] };
        }
        return transformDealsData(deals);
    }, [deals]);

    if (isLoading) {
        return (
            <Flex align="center" justify="center" style={{ height: '200px' }}>
                <Spin indicator={<LoadingOutlined spin />} />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert
                message="Ошибка загрузки сделок"
                description="Не удалось загрузить данные о сделках"
                type="error"
                showIcon
            />
        );
    }

    return <DealsKanbanBoard stagesData={stagesData} />;
}
