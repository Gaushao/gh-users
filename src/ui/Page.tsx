import { PropsWithChildren } from "react";
import Text from "./core/Text";
import Icon from "./core/Icon";
import { RouterHooks } from "../router";
import UsersContext from "./users/Context";

const GIT_URL = "https://github.com/Gaushao/gh-users";
const JEST_URL = "https://gaushao.github.io/gh-users/coverage";
const DOCS_URL = "https://gaushao.github.io/gh-users/docs";

const applicationDisplayName: "applicationDisplayName" =
  "applicationDisplayName";

function PageHeader() {
  const { isHome } = RouterHooks.useHashRouter();
  const {
    user: [, setUser],
  } = UsersContext.useContext();
  return (
    <div className="flex justify-between items-center m-1">
      <div className="flex items-center">
        <div
          onClick={() => setUser(null)}
          className={`rounded-lg border-2 p-1 border-black ${
            isHome ? "hover:bg-sky-300" : "hover:bg-rose-300 "
          } cursor-pointer`}
        >
          <Icon
            name={isHome ? "GithubRounded" : "CancelIcon"}
            width={48}
            height={48}
          />
        </div>
        <div className="m-2" />
        <Text i18n={applicationDisplayName} className="text-2xl" />
      </div>
      <div className="flex items-center">
        <a
          className="rounded-md border-2 border-black bg-white hover:invert"
          href={JEST_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            name="JestIcon"
            className="p-1"
            width={32}
            height={32}
            fill="black"
          />
        </a>
        <div className="m-1" />
        <a
          className="rounded-md border-2 border-black bg-white hover:invert"
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            name="DocsIcon"
            className="p-1"
            width={32}
            height={32}
            fill="black"
          />
        </a>
        <div className="m-1" />
        <a
          className="rounded-full border-2 border-black bg-black hover:invert"
          href={GIT_URL}
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="GithubLogo" width={32} height={32} fill="white" />
        </a>
      </div>
    </div>
  );
}

/**
 * @param props
 */
export default function Page({ children }: PropsWithChildren) {
  RouterHooks.useUnhashEffect();
  return (
    <div className="m-1">
      <PageHeader />
      <div className="m-1">{children}</div>
    </div>
  );
}
Page.Header = PageHeader;
Page.applicationDisplayName = applicationDisplayName;
