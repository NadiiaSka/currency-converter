import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputAmount from "./InputAmount";
import { CurrencyContext } from "../context/CurrencyContext";

describe("InputAmount", () => {
  it("updates the amount value when the user types", async () => {
    const user = userEvent.setup();
    const setFirstAmount = vi.fn();

    render(
      <CurrencyContext.Provider value={{ firstAmount: "", setFirstAmount }}>
        <InputAmount />
      </CurrencyContext.Provider>,
    );

    const input = screen.getByRole("textbox", { name: /amount/i });
    await user.type(input, "123");

    expect(setFirstAmount).toHaveBeenCalled();
  });
});
