import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import CareerPage from "../pages/CareerPage";
import AboutPage from "../pages/AboutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/projects",
        element: <ProjectsPage />,
    },
    {
        path: "/careers",
        element: <CareerPage />
    },
    {
        path: "/about",
        element: <AboutPage />
    }
]);