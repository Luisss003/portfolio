import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/projects",
        element: <ProjectsPage />,
    }
]);