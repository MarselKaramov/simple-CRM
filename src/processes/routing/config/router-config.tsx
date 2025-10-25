import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./routes";
import MainLayout from "@/widgets/layout/MainLayout";
import { LoadingFallback } from "@/shared/ui/LoadingFallback";
import ErrorBoundary from "@/shared/ui/ErrorBoundary";

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
                element: (
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <DashboardPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ROUTES.USERS,
                element: (
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <UsersPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: `${ROUTES.USER}/:userId`,
                element: (
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <UserPage />
                        </Suspense>
                    </ErrorBoundary>

                ),
            },
            {
                path: ROUTES.DEALS,
                element: (
                    <ErrorBoundary>
                        <Suspense fallback={<LoadingFallback />}>
                            <DealsPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
        ],
    }
]);