import { render, screen } from "@testing-library/react";
import { SVG } from "../../../assets";
import Icon from "../Icon";

const names = Object.keys(SVG) as (keyof typeof SVG)[];

test("icons rendering", async () => {
  render(
    <>
      {names.map((name) => (
        <Icon key={name} data-testid={name} name={name} />
      ))}
    </>
  );
  const icons = await Promise.all(
    names.map((name) => screen.getByTestId<SVGElement & HTMLElement>(name))
  );
  expect(icons.every((icon) => icon.nodeName === "svg")).toBeTruthy();
});
