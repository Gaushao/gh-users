import UsersContext from "./Context";
import { UsersItemResponse } from "../../http/types";
import { RouterHooks } from "../../router";

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
          <input type="checkbox" checked={user.site_admin} />
        </div>
      </td>
    </>
  );
}

export default function UsersTable() {
  const { users } = UsersContext.useContext();
  const nav = RouterHooks.useNavToUser();
  if (!users.length) return null;
  return (
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
            onClick={() => nav(u.login)}
          >
            <Item {...u} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
