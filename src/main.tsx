import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from "./store/UserContext";
import Invoices from "./routes/Invoices";
import Invoice, { loader as invoiceLoader } from "./routes/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Invoices /> },
      {
        path: "/invoices/:invoiceId",
        element: <Invoice />,
        loader: invoiceLoader,
      },
    ],
  },
  {
    path: "/invoices",
    element: <Navigate to="/" replace={true} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
