import Input from "../core/Input";
import UsersContext from "./Context";
import { useTranslate } from "../../i18n/hooks";
import Spinner from "../core/Spinner";

type Placeholder = "usernameInputPlaceholder";
const placeholder: Placeholder = "usernameInputPlaceholder";

export default function UserInput() {
  const { query, setQuery, loading } = UsersContext.useUserState();
  return (
    <div className="flex">
      <Input
        value={query}
        onChangeValue={setQuery}
        placeholder={useTranslate(placeholder)}
      />
      <div className="m-1" />
      {loading && <Spinner />}
    </div>
  );
}
UserInput.placeholder = placeholder;
