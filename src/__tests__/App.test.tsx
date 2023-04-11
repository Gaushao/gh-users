import "../utils/mocks/react-router-dom";

import { render } from "@testing-library/react";
import App from "../App";

test("render app without crashing", () => {
  render(<App />);
});
