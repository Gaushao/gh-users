import { createHashRouter, RouterProvider } from "react-router-dom";

import ROUTES from "./routes";

export default function Router() {
  // createHashRouter allows to route react app at gh-pages
  return <RouterProvider router={createHashRouter(ROUTES)} />;
}
