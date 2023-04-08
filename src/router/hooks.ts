import { useCallback, useMemo } from "react";
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import Routes from "./routes";

function getRoute(path: string, ...a: string[]) {
  let args = Array.prototype.slice.call(arguments, 1);
  let count = -1;
  return path.replace(/:[a-zA-Z?]+/g, function (match) {
    count += 1;
    return args[count] !== undefined ? args[count] : match;
  });
}

export default class RouterHooks {
  static get useNav() {
    return (route: Routes, options?: NavigateOptions) => {
      const navigate = useNavigate();
      return useCallback(() => {
        navigate(route, options);
      }, [navigate, route, options]);
    };
  }
  static get useNavToHome() {
    return () => {
      return RouterHooks.useNav(Routes.HOME);
    };
  }
  static get useNavToUsers() {
    return (name?: string) => {
      return RouterHooks.useNav(Routes.HOME, { state: { name } });
    };
  }
  static get useNavToUser() {
    return () => {
      const navigate = useNavigate();
      return useCallback(
        (user: string) => {
          navigate(getRoute(Routes.USER, user));
        },
        [navigate]
      );
    };
  }
  static get useIsHomeRoute() {
    return () => {
      const { pathname } = useLocation();
      return useMemo(() => pathname === Routes.HOME, [pathname]);
    };
  }
}
