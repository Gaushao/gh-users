import { useCallback, useEffect, useMemo, useState } from "react";
import EMPTY from "../utils/empty";
import ApiRoutes from "./routes";
import { UsersResponse } from "./types";

function now() {
  return new Date().getTime();
}

function usePing(loading: boolean) {
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
  return ping;
}

type Callback<Data> = (d: Data) => any;
type Throwback = (e: Error) => any;

function useFetchJSON<Data = unknown>(
  url?: URL,
  callback: Callback<Data> = EMPTY.noop,
  throwback: Throwback = EMPTY.noop
) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const load = useCallback(
    (_url = url) => {
      if (_url && !loading && !error) {
        setLoading(true);
        fetch(_url)
          .then((r) => {
            if (r.status !== 200)
              return r.json().then((d) => {
                throw new Error(d?.message || "unknwon error", {
                  cause: d?.documentation_url || "unknwon cause",
                });
              });
            r.json().then((d) => {
              callback(d);
              setData(d);
              setLoading(false);
            });
          })
          .catch((e) => {
            throwback(e);
            setError(e);
            setLoading(false);
          });
      }
    },
    [url, loading, error, callback, throwback]
  );
  const uncatch = useCallback(() => {
    setError(null);
  }, []);
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);
  return { data, loading, error, ping: usePing(loading), load, uncatch, reset };
}

function useFetchEffect<Data = unknown>(
  url?: URL,
  delay = 0,
  callback: Callback<Data> = EMPTY.noop,
  throwback: Throwback = EMPTY.noop
) {
  const { load, ...handler } = useFetchJSON<Data>(url, callback, throwback);
  useEffect(() => {
    const timeout = setTimeout(() => !!url && load(), delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { load, ...handler };
}

function useUsersUrl(query?: string, page = 1, size = 10) {
  return useMemo(() => {
    if (!query?.length) return;
    const url = new URL(
      `${ApiRoutes.GITHUB_USERS_API}?page=${page}&per_page=${size}`
    );
    url.searchParams.set("q", query);
    return url;
  }, [query, page, size]);
}

// export function useFetchUsers(query?: string, page?: number, size?: number) {
//   return useFetchJSON(useUsersUrl(query, page, size));
// }

export function useFetchUsersEffect(
  query?: string,
  page?: number,
  size?: number
) {
  return useFetchEffect<UsersResponse>(useUsersUrl(query, page, size), 250);
}
