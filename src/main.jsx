import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import "./index.css"; // ✅ Un seul import CSS

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "boutique", element: <Boutique /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
