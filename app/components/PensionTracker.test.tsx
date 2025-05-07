import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

import PensionTracker from "./PensionTracker";

describe("PensionTracker", () => {
  test("should submit form without current pensions", async () => {
    const user = userEvent.setup();

    render(<PensionTracker />);

    await user.type(
      screen.getByLabelText(/Annual income you want in retirement/i),
      "30000"
    );

    await user.type(
      screen.getByLabelText(/Employer monthly contribution/i),
      "100"
    );

    await user.type(screen.getByLabelText(/Your monthly contribution/i), "400");

    await user.type(screen.getByLabelText(/Retirement age/i), "55");

    await user.click(
      screen.getByRole("button", { name: /Calculate Pension/i })
    );

    screen.findByRole("button", { name: /Edit pension/i });

    screen.getByRole("heading", {
      level: 2,
      name: /Pension growth until retirement/i,
    });

    screen.getByRole("heading", {
      level: 2,
      name: /Pension drawdown in retirement/i,
    });

    expect(() =>
      screen.getByRole("heading", {
        level: 2,
        name: /Future value of current pension pots/i,
      })
    ).toThrow();
  });
});
