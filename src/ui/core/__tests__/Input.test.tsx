import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import Input from "../Input";
import userEvent from "@testing-library/user-event";

const TestInput = ({
  onChangeValue,
}: {
  onChangeValue: typeof Input.onChangeValue;
}) => {
  const [state, setState] = useState("");
  return (
    <Input
      value={state}
      onChangeValue={(v) => {
        onChangeValue(v);
        setState(v);
      }}
    />
  );
};

const onChangeValue = jest.fn();

async function setup() {
  render(<TestInput onChangeValue={onChangeValue} />);
  const input = await screen.findByRole<HTMLInputElement>("textbox");
  return { input };
}

test("input change event", async () => {
  const { input } = await setup();
  const value = "text value";
  fireEvent.change(input, { target: { value: "text" } });
  fireEvent.change(input, { target: { value } });
  expect(onChangeValue).toBeCalledWith(value);
  expect(onChangeValue).toBeCalledTimes(2);
  expect(input.value).toBe(value);
});

test("input on user type", async () => {
  const { input } = await setup();
  const value = "text";
  userEvent.type(input, value);
  expect(onChangeValue).toBeCalledWith(value);
  expect(onChangeValue).toBeCalledTimes(4);
  expect(input.value).toBe(value);
});
