import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ROUTES from "./routes";

export default function Router() {
  return <RouterProvider router={createBrowserRouter(ROUTES)} />;
}
