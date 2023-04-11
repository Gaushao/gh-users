import "../../../utils/mocks/react-router-dom";

import { render, screen } from "@testing-library/react";
import { mockTranslate } from "../../../utils/mocks/hooks";
import SearchMock from "../mocks/Search";
import Table from "../Table";

test("rendering empty users table", () => {
  render(<Table />);
  screen.getByText(mockTranslate("noResults"));
});

test("rendering users table", async () => {
  const { users, user } = await SearchMock.setup("z", <Table />);
  const imgs = screen.getAllByRole<HTMLImageElement>("img");
  const boxes = screen.getAllByRole<HTMLInputElement>("checkbox");
  expect(boxes.length).toBe(10);
  users.forEach(async (u, i) => {
    const { login, avatar, site_admin } = user(undefined, i);
    const logins = screen
      .getAllByText(String(login))
      .filter((e) => e.nodeName === "TD");

    expect(logins.length).toBe(1);
    const [loginTD] = logins;
    expect(loginTD.textContent).toBe(login);
    const avatars = imgs.filter(avatar);
    expect(avatars.length).toBe(1);
    expect(boxes[i].checked).toBe(site_admin);
  });
});
