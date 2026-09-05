import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InputAmount from "../../src/components/InputAmount";
import { defaultCurrencyState } from "../fixtures/defaultCurrencyState";
import { renderWithProviders } from "../fixtures/renderWithProviders";

const renderInputAmount = (initialValue = "") => {
  const setFirstAmount = vi.fn();

  renderWithProviders({
    ui: <InputAmount />,
    initialValues: { ...defaultCurrencyState, firstAmount: initialValue },
    setState: setFirstAmount,
  });

  const input = screen.getByRole("textbox", { name: /amount/i });

  return { input, setFirstAmount };
};

describe("Amount Input", () => {
  describe("Positive", () => {
    it("CT-IA-01: Amount input accepts a valid numeric value", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "1234");

      expect(input).toHaveDisplayValue(["1,234"]);
    });

    it("CT-IA-02: Amount input accepts a decimal value", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "10.5");

      expect(input).toHaveDisplayValue(["10.5"]);
    });
  });

  describe("Negative", () => {
    it("CT-IA-03: Amount input rejects invalid characters", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "abc");

      expect(input).toHaveDisplayValue("");
    });

    it("CT-IA-04: Amount input rejects negative values", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "-100");

      expect(input).not.toHaveDisplayValue("-100");
    });
  });

  describe("Edge", () => {
    it("CT-IA-05: Amount input accepts zero", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "0");

      expect(input).toHaveDisplayValue("0");
    });

    it("CT-IA-06: Amount input keeps empty state when cleared", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("500");

      await user.clear(input);

      expect(input).toHaveDisplayValue("");
    });

    it("CT-IA-07: Amount input retains the entered value after typing repeatedly", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "1500");

      expect(input).toHaveDisplayValue(["1,500"]);
    });
  });
});
