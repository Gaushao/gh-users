import UsersPage from "../pages/Users";
import UserPage from "../pages/User";
import RedirectPage from "../pages/Redirect";
import Path from "./path";

const ROUTES = [
  {
    path: Path.FALLBACK,
    Component: RedirectPage,
  },
  {
    path: Path.HOME,
    Component: UsersPage,
  },
  {
    path: Path.USER,
    Component: UserPage,
  },
];

export default ROUTES;
