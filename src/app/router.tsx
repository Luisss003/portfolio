import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ResearchPage from "../pages/ResearchPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },

    {
        path: "/research",
        element: <ResearchPage />
    },

]);