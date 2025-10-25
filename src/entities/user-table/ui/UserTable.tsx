import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { defaultColumns } from '../columns';
import { Button, Flex, Popover, Radio, Space, Spin, Table, Typography } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useFetchUserTableDataQuery } from '../services/user-table.api';
import { ROUTES } from '@/processes/routing/config/routes';
import { Link } from 'react-router';
import { useState } from 'react';
import { getCategory, type TCategory } from '@/shared/helpers/getCategory';
import AddNewUserFormModal from '@/features/addNewUser/AddNewUserForm';

export default function UserTable() {

    const [isAddNewUserModalOpen, setIsAddNewUserModalOpen] = useState(false);

    const { data: tableData, isLoading } = useFetchUserTableDataQuery();
    const [categoryFilter, setCategoryFilter] = useState<'A' | 'B' | 'C' | 'D' | 'all'>('all');

    const table = useReactTable({
        data: tableData ?? [],
        columns: defaultColumns,
        state: {
            globalFilter: categoryFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: (row, _, filterValue) => {
            if (filterValue === 'all') return true;
            return row.original.category === filterValue;
        },
    });

    const categoryTooltipContent = (
        <div>
            <p>
                <strong>Категории клиентов:</strong>
            </p>
            <p>A - Ключевые клиенты</p>
            <p>B - Перспективные клиенты</p>
            <p>C - Регулярные клиенты</p>
            <p>D - Новые клиенты</p>
        </div>
    );

    const antdColumns = table.getHeaderGroups()[0].headers.map((col) => ({
        title: col.isPlaceholder ? null : (
            <Flex
                align='center'
                gap={4}
            >
                {flexRender(col.column.columnDef.header, col.getContext())}
                {col.column.id === 'category' && (
                    <Space>
                        <Popover content={categoryTooltipContent}>
                            <QuestionCircleOutlined
                                size={50}
                                style={{ color: '#77777777', cursor: 'help' }}
                            />
                        </Popover>
                    </Space>
                )}
            </Flex>
        ),
        width: col.column.id === 'id' ? 80 : col.column.id === 'category' ? 150 : col.column.id === 'gender' ? 100 : undefined,
        dataIndex: col.column.id,
        key: col.column.id,
    }));

    const antdData = table.getRowModel().rows.map((row) => {
        const categoryInfo = getCategory(row.original.category as TCategory);
        return {
            key: String(+row.id + 1),
            ...row.original,
            toInfo: (
                <Button
                    color='default'
                    variant='outlined'
                >
                    <Link to={`${ROUTES.USER}/${+row.id + 1}`}>Подробнее</Link>
                </Button>
            ),
            category: (
                <Space>
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: categoryInfo.color,
                            borderRadius: '50%',
                        }}
                    />
                    <Typography.Text>{row.original.category}</Typography.Text>
                </Space>
            ),
        };
    });

    if (isLoading)
        return (
            <Flex
                align='center'
                justify='center'
            >
                <Spin indicator={<LoadingOutlined spin />} />
            </Flex>
        );

    return (
        <Flex
            vertical
            gap={12}
        >
            <Flex justify='space-between'>
                <Radio.Group
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    defaultValue='all'
                >
                    <Radio.Button value='all'>Все</Radio.Button>
                    <Radio.Button value='A'>Ключевые клиенты</Radio.Button>
                    <Radio.Button value='B'>Перспективные клиенты</Radio.Button>
                    <Radio.Button value='C'>Регулярные клиенты</Radio.Button>
                    <Radio.Button value='D'>Новые клиенты</Radio.Button>
                </Radio.Group>
                <Button onClick={() => setIsAddNewUserModalOpen(true)}>Добавить нового клиента</Button>
            </Flex>
            <AddNewUserFormModal isModalOpen={isAddNewUserModalOpen} onClose={() => setIsAddNewUserModalOpen(false)} />
            <Table
                columns={antdColumns}
                dataSource={antdData}
                rowKey='id'
                pagination={false}
            />
        </Flex>
    );
}
