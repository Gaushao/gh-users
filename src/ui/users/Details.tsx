import UsersContext from "./Context";
import Text from "../core/Text";
import Icon from "../core/Icon";
import { RouterHooks } from "../../router";
import { useEffect } from "react";

export default function UserDetails() {
  const {
    user: [user],
    users,
  } = UsersContext.useContext();
  const nav = RouterHooks.useNavToHome();
  const { query: q } = RouterHooks.useHashRouter();
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (user === null) {
      if (!users.length && q)
        timers.push(setTimeout(() => nav({ state: { query: q } }), 250));
      else timers.push(setTimeout(nav, 250));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (!user) return null;
  return (
    <div className="flex">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="rounded"
        width={128}
      />
      <div className="m-1" />
      <div className="relative w-full">
        <div className="text-4xl">{user.login}</div>
        <div className="text-sm text-gray-500">id: {user.id}</div>
        <div className="absolute bottom-0">
          <a
            className="rounded-lg flex items-end hover:text-white hover:fill-white hover:bg-black p-1"
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <Text i18n="viewAtGithub" />
            <div className="m-1" />
            <Icon name="GithubLogo" height={32} />
          </a>
        </div>
      </div>
    </div>
  );
}
