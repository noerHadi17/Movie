import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { RouterProvider } from "react-router";
import { routes } from "./routes";
import { TokenProvider } from "./hooks/useToken";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={routes} />
    </TokenProvider>
  </StrictMode>
);
