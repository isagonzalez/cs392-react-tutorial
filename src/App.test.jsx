import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("launching", () => {
  it("should show the current year", async () => {
    render(<App />);
    await screen.findByText(/2018/);
  });
});
