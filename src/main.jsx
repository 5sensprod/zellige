import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Boutique from "./pages/Boutique.jsx";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout commun
    children: [
      { index: true, element: <Home /> },
      { path: "boutique", element: <Boutique /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
