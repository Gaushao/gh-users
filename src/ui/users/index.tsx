import UsersContext from "./Context";
import UserInput from "./Input";
import UsersTable from "./Table";

export default function Users() {
  UsersContext.useUsersRouting();
  return (
    <div>
      <UserInput />
      <UsersTable />
    </div>
  );
}
