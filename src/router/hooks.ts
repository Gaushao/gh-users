import { useCallback, useEffect } from "react";
import {
  NavigateOptions,
  generatePath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Path from "./path";

export default class RouterHooks {
  static get useNavToHome() {
    return () => {
      const nav = useNavigate();
      return useCallback((o?: NavigateOptions) => nav(Path.HOME, o), [nav]);
    };
  }
  static get useNavToUser() {
    return () => {
      const navigate = useNavigate();
      return useCallback(
        (login: string) => {
          navigate(generatePath(Path.USER, { login }));
        },
        [navigate]
      );
    };
  }
  static get useHashRouter() {
    return () => {
      const { pathname: path } = useLocation();
      const isHome = path === Path.HOME;
      const {
        location: { hash, pathname, href },
      } = window;
      const params = new URL(href).searchParams.get("pathname");
      const willHash =
        isHome && ((!hash.length && path !== pathname) || params);
      return {
        isHome,
        willHash,
        pathname,
        params,
      };
    };
  }
  static get useUnhashEffect() {
    // avoids hashing pathname
    return () => {
      const { willHash, pathname, params } = this.useHashRouter();
      const nav = useNavigate();
      // const navToUser = this.useNavToUser();
      const unhash = useCallback(() => {
        window.history.replaceState(null, "", Path.HOME);
        window.history.replaceState(null, "", "/gh-users/");
        console.log(pathname, "pathname");
        console.log(params, "params");
        const query = (s: string) => s.substring(s.lastIndexOf("/") + 1);
        nav(Path.HOME, { state: { query: query(params || pathname) } });
      }, [nav, params, pathname]);
      useEffect(() => {
        willHash && unhash();
      }, [willHash, unhash]);
    };
  }
}
