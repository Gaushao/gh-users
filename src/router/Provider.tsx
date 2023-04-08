import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Routes from "./routes";

import UsersPage from "../pages/Users";
import UserPage from "../pages/User";
import RedirectPage from "../pages/Redirect";

const router = createBrowserRouter([
  {
    path: Routes.FALLBACK,
    element: <RedirectPage />,
  },
  {
    path: Routes.HOME,
    element: <UsersPage />,
  },
  {
    path: Routes.USER,
    element: <UserPage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
