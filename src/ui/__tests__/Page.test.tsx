import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

test("rendering home page", async () => {
  setup();
  screen.getByText(mockTranslate(Page.applicationDisplayName));
  screen.getByText("github-rounded-border.svg");
});

test("rendering any page", async () => {
  setup("/any");
  await fireEvent.click(screen.getByText("cancel.svg"));
  await waitFor(() => {
    screen.getByText("github-rounded-border.svg");
  });
});
