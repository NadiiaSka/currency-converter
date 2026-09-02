import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import InputAmount from "../../components/InputAmount";
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
    it("CT-AM-01: Amount input accepts a valid numeric value", async () => {
      const user = userEvent.setup();
      const { input, setFirstAmount } = renderInputAmount("");

      await user.type(input, "1234");

      expect(setFirstAmount).toHaveBeenCalled();
      expect(input).toBeInTheDocument();
    });

    it("CT-AM-02: Amount input accepts a decimal value", async () => {
      const user = userEvent.setup();
      const { input, setFirstAmount } = renderInputAmount("");

      await user.type(input, "10.5");

      expect(setFirstAmount).toHaveBeenCalled();
      expect(input).toBeInTheDocument();
    });
  });

  describe("Negative", () => {
    it("CT-AM-03: Amount input rejects invalid characters", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "abc");

      expect(input).toHaveDisplayValue("");
    });

    it("CT-AM-04: Amount input rejects negative values", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("");

      await user.type(input, "-100");

      expect(input).not.toHaveDisplayValue("-100");
    });
  });

  describe("Edge", () => {
    it("CT-AM-05: Amount input accepts zero", async () => {
      const user = userEvent.setup();
      const { input, setFirstAmount } = renderInputAmount("");

      await user.type(input, "0");

      expect(setFirstAmount).toHaveBeenCalled();
      expect(input).toHaveDisplayValue("0");
    });

    it("CT-AM-06: Amount input keeps empty state when cleared", async () => {
      const user = userEvent.setup();
      const { input } = renderInputAmount("500");

      await user.clear(input);

      expect(input).toHaveDisplayValue("");
    });

    it("CT-AM-07: Amount input stores a string value for downstream use (planned regression)", async () => {
      const user = userEvent.setup();
      const { input, setFirstAmount } = renderInputAmount("");

      await user.type(input, "1500");

      expect(setFirstAmount).toHaveBeenLastCalledWith("1500");
    });
  });
});
