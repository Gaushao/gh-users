import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockTranslate } from "../../../utils/mocks/hooks";
import Context from "../Context";
import Input from "../Input";
import { useEffect } from "react";

function getInput() {
  return screen.findByPlaceholderText<HTMLInputElement>(
    mockTranslate(Input.placeholder)
  );
}

test("user input without context", async () => {
  render(<Input />);
  expect((await getInput()).value).toBe("");
});

function Query({ query = "" }) {
  const ctx = Context.useContext();
  useEffect(() => ctx.setQuery(query));
  return null;
}

test("user input location state query", async () => {
  const query = "João";
  render(
    <Context>
      <Input />
      <Query query={query} />
    </Context>
  );
  const input = await getInput();
  expect(input.value).toBe(query);
});

function Value() {
  const { query, loading } = Context.useContext();
  return (
    <div>
      <span data-testid="query">{query}</span>
      <span data-testid="loading">{String(loading)}</span>
    </div>
  );
}

test("user input value changes", async () => {
  render(
    <Context>
      <Input />
      <Value />
    </Context>
  );
  const input = await getInput();
  const value = "username changes";
  fireEvent.change(input, { target: { value: "" } });
  expect(input.value).toBe("");
  userEvent.type(input, value);
  expect(input.value).toBe(value);
  expect(screen.getByTestId<HTMLSpanElement>("query").textContent).toBe(value);
  await waitFor(() => {
    expect(screen.getByTestId<HTMLSpanElement>("loading").textContent).toBe(
      String(true)
    );
  });
  expect(screen.getByTitle("spinner").textContent).toBe("spinner");
  await waitFor(() => {
    expect(screen.getByTestId<HTMLSpanElement>("loading").textContent).toBe(
      String(false)
    );
  });
  expect(screen.queryByTitle("spinner")).toBeNull();
});
