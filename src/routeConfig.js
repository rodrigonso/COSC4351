import {
    createBrowserRouter,
  } from "react-router-dom";

import RootPage from "./components/routes/RootPage";
import AuthPage from "./components/routes/AuthPage";
import NotFoundPage from "./components/routes/AuthPage";
import ReservePage from "./components/routes/ReservePage";


let authRoute;

const router = createBrowserRouter([
    { name: "Home", path: "/", element: <RootPage/>, errorElement: <NotFoundPage /> }, 
    { name: "Reserve", path: "/reserve", element: <ReservePage /> },
    { name: "Log in ", path: "/auth", element: <AuthPage/> },
]);

export const getAuthRoute = () => {
    if (!authRoute)
        authRoute = router.routes.find(i => i.path === '/auth');
    return authRoute;
};

export const getRootChildrenRoute = () => router.routes[0].children;


export default router;