import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import { UsersItemResponse, UsersResponse } from "../../api/types";
import { useFetchUsersEffect } from "../../api/hooks";
import EMPTY from "../../utils/empty";
import { RouterHooks } from "../../router";

export class UsersContextValue {
  data: UsersResponse | null = null;
  loading = false;
  error: Error | null = null;
  query = "";
  user: [
    UsersItemResponse | null,
    React.Dispatch<React.SetStateAction<UsersItemResponse | null>>
  ] = [null, EMPTY.noop];
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
  const user = useState(USERS_VALUE.user[0]);
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
      user,
      users: data?.items || EMPTY.arr,
    }),
    [data, loading, error, clear, query, uncatch, user]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

UsersContext.useContext = () => useContext(Context);
UsersContext.useUsersRouting = () => {
  const {
    users,
    user: [user, setUser],
    query,
    setQuery,
  } = UsersContext.useContext();
  const { state } = useLocation();
  const nav = RouterHooks.useNavToHome();
  useEffect(() => {
    if (state) {
      const { query: q } = state;
      if (query.length) {
        nav({ state: null });
      } else if (q) {
        setQuery(q);
      }
      if (users.length === 1) setUser(users[0]);
    }
  }, [nav, query, setQuery, setUser, state, user, users]);
};
