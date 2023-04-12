import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";

import { UsersResponse } from "../../api/types";
import { useFetchUsersEffect } from "../../api/hooks";
import EMPTY from "../../utils/empty";
import { RouterHooks } from "../../router";

export class UsersContextValue {
  data: UsersResponse | null = null;
  loading = false;
  error: Error | null = null;
  query = "";
  users: UsersResponse["items"] = EMPTY.arr;
  setQuery: React.Dispatch<React.SetStateAction<string>> = EMPTY.noop;
  clear = EMPTY.noop;
  uncatch = EMPTY.noop;
}

const USERS_VALUE = new UsersContextValue();

const Context = createContext(USERS_VALUE);

/**
 * @param props
 */
export default function UsersContext({ children }: PropsWithChildren) {
  const [query, setQuery] = useState(USERS_VALUE.query);
  const { data, loading, error, reset, uncatch } = useFetchUsersEffect(query);
  const clear = useCallback(() => {
    reset();
    setQuery(USERS_VALUE.query);
  }, [reset, setQuery]);
  const value = useMemo(
    () => ({
      data,
      loading,
      error,
      clear,
      query,
      setQuery,
      uncatch,
      users: data?.items || EMPTY.arr,
    }),
    [data, loading, error, clear, query, uncatch]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

UsersContext.useContext = () => useContext(Context);
UsersContext.useUserState = () => {
  const { query, setQuery, loading } = UsersContext.useContext();
  const { state } = useLocation();
  useEffect(() => {
    const { query } = state || {};
    if (query) setQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return { query, setQuery, loading };
};
UsersContext.useUserByParam = () => {
  const { login } = useParams();
  const { data, query, setQuery, loading } = UsersContext.useContext();
  const matches = useMemo(
    () => data?.items.filter((u) => u.login === login),
    [data?.items, login]
  );
  const redirect = RouterHooks.useNavToHome(login);
  useEffect(() => {
    if (!login) return redirect();
    if (loading) return;
    if (login !== query) return setQuery(login);
    if (!query) return;
    if (matches && matches?.length !== 1) redirect();
  }, [loading, login, matches, query, redirect, setQuery]);
  return matches ? matches[0] : undefined;
};
