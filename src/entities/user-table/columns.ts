import type { IUserTable } from '@/shared/types/user-table.types';
import { createColumnHelper } from '@tanstack/react-table';
import { renderGender } from './ui/RenderGender';
import { renderEmail } from './ui/RenderEmail';
import { renderCategory } from './ui/RenderCategory';
import { renderId } from './ui/RenderId';

const columnHelper = createColumnHelper<IUserTable>();

export const defaultColumns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: function (info) {
            return renderId(info.getValue());
        },
        size: 80,
    }),

    columnHelper.accessor('first_name', {
        header: 'Имя',
        cell: function (info) {
            return info.getValue() || '—';
        },
        size: 120,
    }),

    columnHelper.accessor('last_name', {
        header: 'Фамилия',
        cell: function (info) {
            return info.getValue() || '—';
        },
        size: 120,
    }),

    columnHelper.accessor('gender', {
        header: 'Пол',
        cell: function (info) {
            return renderGender(info.getValue());
        },
        size: 100,
    }),

    columnHelper.accessor('email', {
        header: 'Email',
        cell: function (info) {
            return renderEmail(info.getValue());
        },
        size: 200,
    }),

    columnHelper.accessor('category', {
        header: 'Категория',
        cell: function (info) {
            return renderCategory(info.getValue());
        },
        size: 150,
    }),

    columnHelper.accessor('toInfo', {
        header: ' ',
    }),
];
