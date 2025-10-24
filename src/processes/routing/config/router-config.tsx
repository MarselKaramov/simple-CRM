import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { ROUTES } from "./routes";
import MainLayout from "@/widgets/layout/MainLayout";

const DashboardPage = lazy(() => import('@/pages/dashboard/ui/dashboard-page'));
const UsersPage = lazy(() => import('@/pages/users/ui/users-page'));
const UserPage = lazy(() => import('@/pages/user/ui/user-page'));
const DealsPage = lazy(() => import('@/pages/deals/ui/deals-page'));

export const router = createBrowserRouter([
    {
        path: ROUTES.DASHBOARD,
        element: <MainLayout />,
        children: [
            {
                index: true,
                path: ROUTES.DASHBOARD,
                Component: DashboardPage
            },
            {
                path: ROUTES.USERS,
                Component: UsersPage
            },
            {
                path: ROUTES.USER,
                Component: UserPage
            },
            {
                path: ROUTES.DEALS,
                Component: DealsPage
            },

        ],
    }
])