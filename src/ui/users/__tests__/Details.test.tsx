import "../../../utils/mocks/react-router-dom";
import { render, screen } from "@testing-library/react";
import SearchMock from "../mocks/Search";
import Details from "../Details";

const query = "Gaushao";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ login: query }),
  useNavigate: () => jest.fn(),
}));

test("rendering empty details", () => {
  render(<Details />);
});

test("rendering user details", async () => {
  const { login, user } = await SearchMock.setup(query, <Details />);
  const { id, avatar, html_url } = user({
    login,
  });
  const img = screen.getByRole<HTMLImageElement>("img");
  const [loginDIV, ...logins] = screen
    .getAllByText(query)
    .filter((e) => e.getAttribute("data-testid") === null);
  expect(logins.length).toBe(0);
  expect(loginDIV.nodeName).toBe("DIV");
  expect(avatar(img)).toBeTruthy();
  expect(screen.getByText(String("id: " + id)).nodeName).toBe("DIV");
  const link = screen.getByRole<HTMLLinkElement>("link");
  expect(link.href).toBe(html_url);
});
