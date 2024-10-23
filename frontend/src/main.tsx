import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PredictionContextProvider } from "./context/PredictioContext.tsx";
import Home from "./router/Home.tsx";
import Result from "./router/Result.tsx";
import App from "./App.tsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/result",
                element: <Result />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PredictionContextProvider>
            <RouterProvider router={router} />
        </PredictionContextProvider>
    </StrictMode>
);
