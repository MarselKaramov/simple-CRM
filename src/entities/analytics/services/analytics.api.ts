import supabaseBaseQuery from '@/shared/supabase/supabaseBaseQuery';
import type { IAnalytics } from '@/shared/types/analytics.types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const analyticsData = createApi({
    reducerPath: 'analyticsData',
    baseQuery: supabaseBaseQuery,
    endpoints: (build) => ({
        getAnalyticsCategory: build.query<IAnalytics[], void>({
            query: () => ({ table: 'person', method: 'selectCategories' }),
        }),
    }),
});

export const { useGetAnalyticsCategoryQuery } = analyticsData;
