import UsersContext from "./Context";
import { UsersItemResponse } from "../../api/types";
import { RouterHooks } from "../../router";
import Text from "../core/Text";
import { useEffect, useRef } from "react";

function Item(user: UsersItemResponse) {
  return (
    <>
      <td>
        <div className="flex justify-center">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={32}
            className="rounded"
          />
        </div>
      </td>
      <td>{user.login}</td>
      <td>
        <div className="flex justify-center">
          <input type="checkbox" checked={user.site_admin} readOnly />
        </div>
      </td>
    </>
  );
}

function url(str: string) {
  try {
    return new URL(String(str));
  } catch (e) {
    return str;
  }
}

function TableError({
  error,
  uncatch,
}: {
  error: Error | null;
  uncatch: () => void;
}) {
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(uncatch, 5000);
    return () => clearTimeout(timer);
  }, [error, uncatch]);
  if (!error) return null;
  const cause = error.cause ? url(String(error.cause)) : "unknown";
  return (
    <div>
      <Text className="font-bold text-red-600">{error.message}</Text>
      <br />
      {typeof cause === "string" ? (
        <>
          <Text i18n="cause" />: <Text>{cause}</Text>
        </>
      ) : (
        <a
          href={cause.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg text-white font-bold bg-red-600 p-1"
        >
          <Text i18n="readMore" />
        </a>
      )}
    </div>
  );
}

export default function UsersTable() {
  const {
    users,
    loading,
    error,
    uncatch,
    user: [user, setUser],
    query,
  } = UsersContext.useContext();
  const nav = RouterHooks.useNavToUser();
  useEffect(() => {
    if (user) nav(user.login);
  }, [nav, user]);

  const l = useRef(false);
  const q = useRef(query);
  useEffect(() => {
    if (loading !== l.current) {
      l.current = loading;
      if (users.length === 1) {
        if (!q.current.includes(query)) {
          setUser(users[0]);
          q.current = query;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!users.length && !loading && !error)
    return (
      <div>
        <Text i18n="noResults" />
      </div>
    );
  return (
    <div>
      <TableError error={error} uncatch={uncatch} />
      {!!users.length && (
        <table className="mt-2 w-full">
          <thead className="bg-sky-300">
            <tr>
              <th>avatar</th>
              <th>login</th>
              <th>admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.login}
                className="cursor-pointer hover:bg-emerald-100"
                onClick={() => setUser(u)}
              >
                <Item {...u} />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
