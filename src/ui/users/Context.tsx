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

import { UsersResponse } from "../../http/types";
import { useFetchUsersEffect } from "../../http/hooks";
import EMPTY from "../../utils/empty";
import { RouterHooks } from "../../router";

class UsersContextValue {
  data: UsersResponse | null = null;
  loading = false;
  user = "";
  users: UsersResponse["items"] = EMPTY.arr;
  setUser: React.Dispatch<React.SetStateAction<string>> = EMPTY.noop;
  clear = EMPTY.noop;
  reset = EMPTY.noop;
}

const USERS_VALUE = new UsersContextValue();

const Context = createContext(USERS_VALUE);

export default function UsersContext({ children }: PropsWithChildren) {
  const [user, setUser] = useState(USERS_VALUE.user);
  const { data, loading, clear } = useFetchUsersEffect(user);
  const reset = useCallback(() => {
    clear();
    setUser(USERS_VALUE.user);
  }, [clear, setUser]);
  const value = useMemo(
    () => ({
      data,
      loading,
      clear,
      reset,
      user,
      setUser,
      users: data?.items || EMPTY.arr,
    }),
    [data, loading, clear, reset, user]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

UsersContext.useContext = () => useContext(Context);
UsersContext.useUser = () => {
  const { user, setUser } = UsersContext.useContext();
  const { state } = useLocation();
  useEffect(() => {
    const { name } = state || {};
    if (name) setUser(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return { user, setUser };
};
UsersContext.useUserByParam = () => {
  const { name } = useParams();
  const { data, setUser, loading } = UsersContext.useContext();
  const matches = useMemo(
    () => data?.items.filter((u) => u.login === name),
    [data?.items, name]
  );
  const redirect = RouterHooks.useNavToUsers(name);
  useEffect(() => {
    if (loading) return;
    if (name && !matches) return setUser(name);
    if ((matches && matches?.length > 1) || !matches?.length) return redirect();
  }, [redirect, loading, matches, name, setUser]);
  return matches ? matches[0] : undefined;
};
