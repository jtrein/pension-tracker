import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import RootLayout from "./layout";

describe("Root layout", () => {
  test("should render RootLayout", () => {
    render(<RootLayout>Hi</RootLayout>);

    expect(screen.getByText(/hi/i)).toBeInTheDocument();
  });
});
