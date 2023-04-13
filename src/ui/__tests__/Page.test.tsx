import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { mockTranslate } from "../../utils/mocks/hooks";
import Path from "../../router/path";
import Page from "../Page";

function setup(path: string = Path.HOME) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Page />
    </MemoryRouter>
  );
}
test("rendering any page", async () => {
  setup("/any");
  screen.getByText(mockTranslate(Page.applicationDisplayName));
  screen.getByText("jest.svg");
  screen.getByText("docs.svg");
  screen.getByText("github-logo.svg");
});

test("rendering home page", async () => {
  setup();
  screen.getByText("github-rounded-border.svg");
});
