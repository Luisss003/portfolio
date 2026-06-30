import { createBrowserRouter } from "react-router-dom";
import type { ReactNode } from "react";
import BlogIndexPage from "../pages/BlogIndexPage";
import BlogPostPage from "../pages/BlogPostPage";
import { PageFrame } from "../components/PageFrame";
import { HomePage } from "../pages/HomePage";
import ResearchPage from "../pages/ResearchPage";

function framed(element: ReactNode) {
    return <PageFrame>{element}</PageFrame>;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: framed(<HomePage />),
    },

    {
        path: "/research",
        element: framed(<ResearchPage />)
    },

    {
        path: "/blog",
        element: framed(<BlogIndexPage />)
    },

    {
        path: "/blog/:slug",
        element: framed(<BlogPostPage />)
    },

]);
