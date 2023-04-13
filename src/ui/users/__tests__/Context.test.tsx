import "../../../utils/mocks/react-router-dom";
import SearchMock from "../mocks/Search";

test("users context max length on search", async () => {
  const { users } = await SearchMock.setup("a");
  expect(users.length).toBe(10);
});

test("users context encoding on search", async () => {
  const badquery = "João";
  const { user } = await SearchMock.setup(badquery);
  expect(Number.isInteger(user()?.id)).toBeTruthy();
});

test("users context query on search", async () => {
  const value = "Gaushao";
  const query = "user:" + value;
  const { user } = await SearchMock.setup(query);
  expect(user()?.login).toBe(value);
});
