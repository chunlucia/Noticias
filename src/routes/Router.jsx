import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/News/NotNews";
//import Home from "../Home";
//import Profile from "../Profile";


const Router = createBrowserRouter(
    [
        {
            element: <Layout />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    index: true, // path: "/"
                    element: (
                        <ProtectedRoute>
                            <ArticleForm />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/about",
                    element: (
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "*",
                    element: <NotFound />,
                },
            ],
        },
    ],
    {
        basename: "/react_context",
    }
);

export default Router;