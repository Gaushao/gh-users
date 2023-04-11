import { PropsWithChildren } from "react";
import Text from "./core/Text";
import Icon from "./core/Icon";
import { RouterHooks } from "../router";

const applicationDisplayName: "applicationDisplayName" =
  "applicationDisplayName";

function PageHeader() {
  const nav = RouterHooks.useNavToHome();
  const isHome = RouterHooks.useIsHomeRoute();
  return (
    <div className="flex items-center m-1">
      <div
        onClick={nav}
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
  );
}

export default function Page({ children }: PropsWithChildren) {
  return (
    <div className="m-1">
      <PageHeader />
      <div className="m-1">{children}</div>
    </div>
  );
}
Page.applicationDisplayName = applicationDisplayName;
