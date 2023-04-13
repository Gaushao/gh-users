import { useCallback, useEffect } from "react";
import {
  NavigateOptions,
  generatePath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Path from "./path";

const q = (s: string) => s.substring(s.lastIndexOf("/") + 1);

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
      const query = href.includes("/gh-users/#/user/") ? q(href) : null;
      const params = new URL(href).searchParams.get("pathname");
      const willHash =
        isHome && ((!hash.length && path !== pathname) || params);
      return {
        isHome,
        willHash,
        pathname,
        params,
        query,
      };
    };
  }
  static get useUnhashEffect() {
    // avoids hashing pathname
    return () => {
      const { willHash, pathname, params, query } = this.useHashRouter();
      const nav = useNavigate();
      const navUser = this.useNavToUser();
      const unhash = useCallback(
        (str: string) => {
          window.history.replaceState(null, "", "/gh-users/");
          nav(Path.HOME, { state: { query: q(str) } });
        },
        [nav]
      );
      useEffect(() => {
        if (willHash) unhash(params || pathname);
        else if (!!query) {
          navUser(query);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [willHash]);
    };
  }
}
