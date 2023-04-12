import { useEffect } from "react";
import { RouterHooks } from "../router";

export default function RedirectPage() {
  const { isHome } = RouterHooks.useHashRouter();
  const nav = RouterHooks.useNavToHome();
  useEffect(() => {
    if (!isHome) nav();
  }, [isHome, nav]);
  return null;
}
