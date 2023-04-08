import { useCallback, useEffect, useMemo, useState } from "react";
import EMPTY from "../utils/empty";
import HTTP_ROUTES from "./routes";
import { UsersResponse } from "./types";

function now() {
  return new Date().getTime();
}

function useFetchJSON<Data = unknown>(
  url?: URL,
  callback: (d: Data) => any = EMPTY.noop,
  throwback: (e: Error) => any = EMPTY.noop
) {
  const [data, store] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, deny] = useState<Error | null>(null);
  const [start, setStart] = useState(0);
  const [ping, setPing] = useState(0);
  const timing = useCallback(() => now() - start, [start]);
  useEffect(() => {
    if (loading) {
      setPing(0);
      setStart(now());
    } else if (start) {
      setPing(timing());
      setStart(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  const load = useCallback(
    (_url = url) => {
      if (_url && !loading) {
        setLoading(true);
        fetch(_url)
          .then((r) => {
            r.json().then((d) => {
              callback(d);
              store(d);
              setLoading(false);
            });
          })
          .catch((e) => {
            throwback(e);
            deny(e);
            setLoading(false);
          });
      }
    },
    [callback, throwback, loading, url]
  );
  return { data, load, loading, error, ping };
}

function useFetchEffect<Data = unknown>(url?: URL, delay = 0) {
  const { data, load, loading, error, ping } = useFetchJSON<Data>();
  useEffect(() => {
    const timeout = setTimeout(() => !!url && load(url), delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  const clear = useCallback(() => {}, []);
  return { data, load, loading, clear, error, ping };
}

function useUsersUrl(name?: string, page = 1, size = 10) {
  return useMemo(() => {
    if (!name?.length) return;
    const url = new URL(
      `${HTTP_ROUTES.GITHUB_USERS_API}?page=${page}&per_page=${size}`
    );
    url.searchParams.set("q", name);
    return url;
  }, [name, page, size]);
}

// export function useFetchUsers(name?: string, page?: number, size?: number) {
//   return useFetchJSON(useUsersUrl(name, page, size));
// }

export function useFetchUsersEffect(
  name?: string,
  page?: number,
  size?: number
) {
  return useFetchEffect<UsersResponse>(useUsersUrl(name, page, size), 250);
}
