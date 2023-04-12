import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
  generatePath,
  useLocation,
} from "react-router-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import UsersContext from "../../ui/users/Context";
import ROUTES from "../routes";
import Path from "../path";

function TestPage() {
  const location = useLocation();
  return <span data-testid="pathname">{location.pathname}</span>;
}

const TEST_ROUTE: RouteObject = {
  path: "/test",
  Component: TestPage,
};

test("router 404 redirect", async () => {
  const testroute = TEST_ROUTE.path as string;
  const badroute = "/some/bad/route";
  const router = createMemoryRouter([...ROUTES, TEST_ROUTE], {
    initialEntries: [testroute],
  });
  render(<RouterProvider router={router} />);
  const pathname = screen.getByTestId("pathname");
  expect(pathname.textContent).toBe(testroute);
  await act(() => {
    router.navigate(badroute);
  });
  expect(router.state.location.pathname).toBe(Path.HOME);
});

test("router user search", async () => {
  const user = "Gaushao";
  const baduser = user.repeat(88);
  const userroute = generatePath(Path.USER, { login: user });
  const baduserroute = generatePath(Path.USER, { login: baduser });
  const router = createMemoryRouter(ROUTES, {});
  render(
    <UsersContext>
      <RouterProvider router={router} />
    </UsersContext>
  );
  await act(() => {
    router.navigate(userroute);
  });
  expect(router.state.location.pathname).toBe(userroute);
  await waitFor(() => {
    screen.getByText(user);
  });
  await act(() => {
    router.navigate(baduserroute);
  });
  expect(router.state.location.pathname).toBe(Path.HOME);
  expect(router.state.location.state.query).toBe(baduser);
});
