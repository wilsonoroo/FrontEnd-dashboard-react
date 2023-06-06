import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza MiComponente", () => {
  render(<App />);
  const linkElement = screen.getByText(/algún texto en tu componente/i);
  expect(linkElement).toBeInTheDocument();
});
