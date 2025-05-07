import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import Home from "./page";

describe("Root layout", () => {
  test("should render RootLayout", () => {
    render(<Home />);

    screen.getByRole("heading", { level: 1, name: /pension squirrel/i });

    screen.getByLabelText(/pension form/i);
  });
});
