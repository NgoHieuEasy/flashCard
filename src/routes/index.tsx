import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { paths } from "./paths";
import { SplashScreen } from "@/components/loading";
import MainLayout from "@/layouts/main-layout";
const UnitPage = lazy(() => import("@/pages/unit/index"));
const SessionPage = lazy(() => import("@/pages/session/index"));
const FlashCardPage = lazy(() => import("@/pages/session/flash-card"));
const WritingCardPage = lazy(() => import("@/pages/session/writing-card"));

export function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <MainLayout>
              <Outlet />
            </MainLayout>
          ),
          children: [
            {
              path: paths.root,
              element: <UnitPage />,
            },
            {
              path: "session/:id",
              element: <SessionPage />,
            },
            {
              path: "flashCard/:id",
              element: <FlashCardPage />,
            },
            {
              path: "writingCard/:id",
              element: <WritingCardPage />,
            },
          ],
        },
      ],
    },

    // No match
    { path: "*", element: <Navigate to={paths.page404} replace /> },
  ]);
}
