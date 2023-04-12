import { useCallback, useEffect } from "react";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import Path from "./path";

export default class RouterHooks {
  static get useNavToHome() {
    return (query?: string) => {
      const nav = useNavigate();
      return useCallback(
        () => nav(Path.HOME, { state: { query } }),
        [nav, query]
      );
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
      const navToUser = this.useNavToUser();
      const unhash = useCallback(() => {
        window.history.replaceState(null, "", Path.HOME);
        window.history.replaceState(null, "", "/gh-users/");
        if (params) {
          navToUser(params.substring(params.lastIndexOf("/") + 1));
        } else {
          nav(params || pathname);
        }
      }, [nav, navToUser, params, pathname]);
      useEffect(() => {
        willHash && unhash();
      }, [willHash, unhash]);
    };
  }
}
