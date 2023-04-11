import { render, screen } from "@testing-library/react";
import Text from "../Text";
import I18N from "../../../i18n";
import { mockTranslation } from "../../../utils/mocks/hooks";

test("text child render", async () => {
  const text = "text";
  render(<Text>{text}</Text>);
  expect((await screen.findByText(text)).textContent).toBe(text);
});

test("text translation", async () => {
  const id = "text";
  const i18n = I18N.TRANSLATION_KEYS[0];
  render(<Text data-testid={id} i18n={i18n} />);
  expect((await screen.findByTestId(id)).textContent).toBe(
    mockTranslation()[i18n]
  );
});
