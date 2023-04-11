import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UsersItemResponse } from "../../../api/types";
import UsersContext from "../Context";

function userId(index: number) {
  return `user-${index}`;
}

export default function SearchMock({ login }: { login?: string }) {
  const { query, users, setQuery, loading } = UsersContext.useContext();
  return (
    <div>
      <div data-testid="search" onClick={() => login && setQuery(login)} />
      <div data-testid="username">{query}</div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="length">{String(users.length)}</span>
      {users.map((u, i) => (
        <div key={u.login} data-testid={userId(i)}>
          {JSON.stringify(u)}
        </div>
      ))}
    </div>
  );
}

SearchMock.setup = async (
  login?: string,
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  ui?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => {
  render(
    ui ? (
      ui
    ) : (
      <UsersContext>
        {children}
        <SearchMock login={login} />
      </UsersContext>
    )
  );
  const username = await screen.findByTestId<HTMLDivElement>("username");
  const search = await screen.findByTestId<HTMLDivElement>("search");
  const loading = await screen.findByTestId<HTMLDivElement>("loading");
  const length = await screen.findByTestId<HTMLDivElement>("length");
  expect(loading.textContent).toBe(String(false));
  fireEvent.click(search);
  await waitFor(() => {
    expect(username.textContent).toBe(login);
  });
  await waitFor(() => {
    expect(loading.textContent).toBe(String(true));
  });
  await waitFor(() => {
    expect(loading.textContent).toBe(String(false));
  });
  const users = await Promise.all(
    Array(Number(length.textContent))
      .fill(null)
      .map(async (_, i) => await screen.findByTestId<HTMLDivElement>(userId(i)))
  );
  const usersJSON = Object.keys(users).map(
    (id) => JSON.parse(users[Number(id)].textContent || "") as UsersItemResponse
  );
  await waitFor(() => {
    expect(usersJSON.length).toBe(users.length);
  });
  const byQuery =
    (query?: Partial<UsersItemResponse>) => (user: UsersItemResponse) => {
      if (!query) return false;
      type QueryKey = keyof typeof query;
      return Object.keys(query).every((q) => {
        return query[q as QueryKey] === user[q as QueryKey];
      });
    };
  return {
    login,
    username,
    search,
    loading,
    length,
    users,
    user(query?: Partial<UsersItemResponse>, index?: number) {
      const user =
        query === undefined
          ? usersJSON[index || 0]
          : usersJSON.find(byQuery(query)) ||
            ({} as Partial<UsersItemResponse>);
      const avatar_alt = user ? `${user.login} avatar` : undefined;
      return {
        ...user,
        avatar_alt,
        avatar(img: HTMLImageElement) {
          return img.src === user.avatar_url && img.alt === avatar_alt;
        },
      };
    },
  };
};
