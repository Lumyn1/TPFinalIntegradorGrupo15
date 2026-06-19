import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { AdminProvider } from "./context/AdminContext";
import router from "./routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <RouterProvider router={router} />
    </AdminProvider>
  </StrictMode>
);