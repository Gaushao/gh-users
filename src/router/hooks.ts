import { useCallback, useMemo } from "react";
import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import Path from "./path";
import { routing } from "./utils";

export default class RouterHooks {
  static get useNav() {
    return (route: Path, options?: NavigateOptions) => {
      const navigate = useNavigate();
      return useCallback(() => {
        navigate(route, options);
      }, [navigate, route, options]);
    };
  }
  static get useNavToHome() {
    return (query?: string) => {
      return RouterHooks.useNav(Path.HOME, { state: { query } });
    };
  }
  static get useNavToUser() {
    return () => {
      const navigate = useNavigate();
      return useCallback(
        (user: string) => {
          navigate(routing(Path.USER, user));
        },
        [navigate]
      );
    };
  }
  static get useIsHomeRoute() {
    return () => {
      const { pathname } = useLocation();
      return useMemo(() => pathname === Path.HOME, [pathname]);
    };
  }
}
