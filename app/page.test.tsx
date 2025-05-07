import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Home from "./page";

describe("Root layout", () => {
  test("should render RootLayout", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /read our docs/i })
    ).toBeInTheDocument();
  });
});
