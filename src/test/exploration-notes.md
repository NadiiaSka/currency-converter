## Component Testing:

### Amount Input

#### Flows

1. Reviewed the component structure in `src/components/InputAmount.jsx` and traced how the value is read from context.
2. Followed the input path from `TextField` into the custom `NumericFormatCustom` wrapper and then into `NumericFormat`.
3. Checked how typing updates the state through `setFirstAmount(event.target.value)`.
4. Examined the formatter behavior for grouping, empty values, and numeric handling.
5. Considered positive, negative, and edge-case inputs such as normal numbers, invalid text, empty input, decimals, and large values.

#### Surprises

- When typing a valid numeric value, the component stores it as a string rather than a number. What I expected was a numeric value suitable for direct arithmetic; what actually happened was that the value was kept as a string and later conversion logic must handle coercion explicitly.
- The input accepts formatted numeric behavior through `NumericFormat`, but there is no explicit validation rule in the component for negative values. I expected the component to define a clear policy for invalid or disallowed input; instead, it relied on the formatter defaults and app-level assumptions.
- Empty input is handled implicitly by setting the value to an empty string, but there is no explicit empty-state normalization. I expected a clear, intentional empty-state contract; what happened was that the component simply passed the raw value through context.
- Decimal handling is not explicitly defined in the component. I expected the currency field to clearly support or reject decimal entries; what actually happened was that decimal behavior depended on the default `NumericFormat` configuration rather than a deliberate rule in the component itself.
- Large values are displayed with thousands separators because `thousandSeparator` is enabled, but the stored value remains a raw string. I expected one consistent value representation; what happened was a display-formatted value in the UI and a separate raw string in state.
- The component does not enforce finance-specific constraints such as allowed negative values, decimal precision, or invalid-character rejection at the component boundary. I expected a stricter contract for a currency amount field; instead, the behavior depended on the underlying formatter and surrounding app logic.

### Country selection

#### Flows

1. Reviewed the `SelectCountry` component and traced the data flow from the country list query into the `Autocomplete` UI.
2. Checked how the component normalizes country objects and extracts the first currency code.
3. Followed how the selected country is passed back through `setValue(newValue)`.
4. Inspected the option rendering and label formatting for both the dropdown list and the selected value.
5. Reviewed the loading and error states to understand how the control behaves when data is unavailable.

#### Surprises

- The component filters and sorts the country list before rendering, which makes the dropdown more user-friendly. I expected a plain raw list of all countries; what happened was that the list was normalized and prioritized to show popular countries first.
- The selected value is only accepted if it matches an option in the loaded list. I expected the value to render even if the data is stale or missing; instead, it falls back to `null` when the value is not present in the dataset.
- The component extracts the currency code from `Object.keys(country.currencies)[0]`, which assumes a single primary currency per country. I expected this to be documented as a business rule; instead, it was implied by the implementation and may not reflect all edge cases.
- The loading state returns an empty `Grid` placeholder rather than a visible loading indicator. I expected a user-facing loading indicator; what happened was a blank placeholder with no message.
- The error state returns the raw string `Something went wrong!` instead of a structured UI message or retry action. I expected a clearer fallback UI; instead, the component rendered plain text.

### Swap button

#### Flows

1. Reviewed the `SwitchCurrency` component and traced the state updates in the click handler.
2. Followed how `fromCurrency` and `toCurrency` are read from context and swapped in place.
3. Checked how the component behaves when both selections are present versus when one or both are missing.
4. Inspected the button itself and its interaction path from click to state mutation.

#### Surprises

- The swap button directly swaps the two context values with `setFromCurrency(toCurrency); setToCurrency(fromCurrency)`. I expected the component to guard against null values; what actually happened was that it executed the swap even if one side was empty, which can produce a temporary invalid state.
- The component has no disabled state. I expected the swap action to be unavailable when the user has not selected both currencies; instead, the button remains clickable and may trigger a meaningless swap.
- The swap logic is simple and effective, but it does not preserve any additional metadata beyond the selected country objects. I expected a more defensive state transition; instead, the component replaced the entire objects directly.

### Result rendering

#### Flows

1. Reviewed the main rendering logic in `App.jsx` and traced how `fromCurrency`, `toCurrency`, and `firstAmount` are converted into currency codes.
2. Followed the `shouldFetchData` condition and the `useQuery` call that triggers conversion.
3. Checked when the converted result is rendered and when it is hidden.
4. Inspected the display text formatting using `Number(...).toLocaleString()`.

#### Surprises

- The result only renders when `firstAmount` is truthy and both currency codes exist. I expected the conversion to be shown as soon as the user begins inputting; instead, it waits for valid source/target data and a non-empty amount.
- The component renders the source amount and target amount in the same line, but the result block is conditional and can disappear abruptly when the amount is cleared. I expected a stable state; what happened was that the UI conditionally removed the result without a separate empty-state pattern.
- The code derives `codeFromCurrency` and `codeToCurrency` by reading the first key in each `currencies` object. I expected this to be explicit as a business rule; instead, it was implied by the data structure and may fail if the object shape changes.
- The result is rounded at the fetch layer, but displayed again with `toLocaleString()`. I expected one single formatting policy; instead, the app uses formatting at rendering time and rounding at API result time.

### No result when invalid state

#### Flows

1. Reviewed the `App` conditional logic controlling when conversion data is fetched and displayed.
2. Traced the `shouldFetchData` condition based on currency code presence and amount presence.
3. Inspected the UI branch that either renders the result summary or renders nothing.
4. Considered invalid combinations such as missing source currency, missing target currency, missing amount, and partial selection states.

#### Surprises

- The app intentionally hides the conversion output until all required values are present. I expected the UI to show a message or placeholder when a state is incomplete; instead, it rendered nothing.
- The `shouldFetchData` check is a Boolean gate based on `codeFromCurrency && codeToCurrency && firstAmount`. I expected a more explicit invalid-state strategy; instead, the app depended on a minimal truthy condition rather than a named validation state.
- The UI does not explain why the result is missing when state is incomplete. I expected a helpful message such as “Select both currencies and enter an amount”; instead, the screen simply stays blank.
- If the amount is invalid or empty, `firstAmount` is falsy and the result section disappears immediately. I expected the app to keep the layout stable while showing a clear user guidance state; instead, the component collapsed the output without explicit feedback.
