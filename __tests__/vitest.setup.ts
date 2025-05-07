import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";

// Mock out google fonts from next. They do not run in jsdom.
vi.mock("next/font/google", () => {
  return {
    Geist: vi.fn(() => ({
      className: "font-geist",
      variable: "font-geist",
    })),
    Geist_Mono: vi.fn(() => ({
      className: "font-geist-mono",
      variable: "font-geist-mono",
    })),
  };
});

// Stub out ResizeObserver
vi.stubGlobal(
  "ResizeObserver",
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
);

afterEach(() => {
  cleanup();
});
