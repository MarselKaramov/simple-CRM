import { userTableData } from '@/entities/user-table/services/user-table.api';
import { userInfoData } from '@/entities/user-info/services/user-info.api';
import { configureStore } from '@reduxjs/toolkit';
import { analyticsData } from '@/entities/analytics/services/analytics.api';

export const store = configureStore({
    reducer: {
        [userTableData.reducerPath]: userTableData.reducer,
        [userInfoData.reducerPath]: userInfoData.reducer,

        [analyticsData.reducerPath]: analyticsData.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userTableData.middleware, userInfoData.middleware, analyticsData.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
