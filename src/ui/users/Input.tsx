import Input from "../core/form/Input";
import UsersContext from "./Context";
import { useTranslate } from "../../i18n/hooks";

export default function UserInput() {
  const { user, setUser } = UsersContext.useUser();
  return (
    <Input
      value={user}
      onChangeValue={setUser}
      placeholder={useTranslate("usernameInputPlaceholder")}
    />
  );
}
