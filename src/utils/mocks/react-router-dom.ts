import { Location, useParams } from "react-router-dom";

export const navigateMock = jest.fn();

export const locationMock: Location = {
  pathname: "/",
  state: { query: "username" },
  key: "",
  search: "",
  hash: "",
};

export const paramsMock: ReturnType<typeof useParams> = {
  login: "",
};

export default jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => navigateMock,
  useLocation: () => locationMock,
  useParams: () => paramsMock,
}));
