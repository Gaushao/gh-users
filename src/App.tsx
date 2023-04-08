import UsersContext from "./ui/users/Context";
import Router from "./router/Provider";

export default function App() {
  return (
    <UsersContext>
      <Router />
    </UsersContext>
  );
}
