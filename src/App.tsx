import UsersContext from "./ui/users/Context";
import { PagesRouter } from "./router";

export default function App() {
  return (
    <UsersContext>
      <PagesRouter />
    </UsersContext>
  );
}
