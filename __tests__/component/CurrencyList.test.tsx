import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import CurrencyList from "@/components/CurrencyList";
import { Currency } from "@/types";

const mockCurrencies: Currency[] = [
  {
    currency: "FJD",
    nameI18N: "Fiji Dollar",
    exchangeRate: { buy: 123.45, sell: 120.75 },
    flags: "",
  },
  {
    currency: "MXN",
    nameI18N: "Mexican Peso",
    exchangeRate: { buy: 15.23, sell: 14.98 },
    flags: "",
  },
  {
    currency: "KES",
    nameI18N: "Kenyan Shilling",
    exchangeRate: { buy: 15.23, sell: 14.98 },
    flags: "",
  },
];

describe("CurrencyList Component", () => {
  it("renders a list of currencies with their details", () => {
    render(<CurrencyList currencies={mockCurrencies} />);

    // Verify currency names
    expect(screen.getByText("Fiji Dollar")).toBeInTheDocument();
    expect(screen.getByText("Mexican Peso")).toBeInTheDocument();
    expect(screen.getByText("Kenyan Shilling")).toBeInTheDocument();

    // Verify currency codes
    expect(screen.getByText("FJD")).toBeInTheDocument();
    expect(screen.getByText("MXN")).toBeInTheDocument();
    expect(screen.getByText("KES")).toBeInTheDocument();

    // Verify exchange rates for all currencies
    const fijiContainer = screen.getByText("Fiji Dollar").closest("li");
    expect(fijiContainer).toHaveTextContent("Buy Rate: 123.45 KES");
    expect(fijiContainer).toHaveTextContent("Sell Rate: 120.75 KES");

    const mexicanContainer = screen.getByText("Mexican Peso").closest("li");
    expect(mexicanContainer).toHaveTextContent("Buy Rate: 15.23 KES");
    expect(mexicanContainer).toHaveTextContent("Sell Rate: 14.98 KES");

    const kenyanContainer = screen.getByText("Kenyan Shilling").closest("li");
    expect(kenyanContainer).toHaveTextContent("Buy Rate: 15.23 KES");
    expect(kenyanContainer).toHaveTextContent("Sell Rate: 14.98 KES");
  });

  it("renders a placeholder if flags are unavailable", () => {
    render(<CurrencyList currencies={mockCurrencies} />);

    // Verify placeholder for missing flags
    const placeholders = screen.getAllByText("No Flag");
    expect(placeholders.length).toBe(3); // All three currencies have no flags
  });

  it("renders exchange rates correctly even when all currencies have no flags", () => {
    render(<CurrencyList currencies={mockCurrencies} />);

    // Verify each currency's container contains the correct exchange rates
    mockCurrencies.forEach((currency) => {
      const container = screen.getByText(currency.nameI18N).closest("li");
      expect(container).toHaveTextContent(
        `Buy Rate: ${currency.exchangeRate.buy} KES`
      );
      expect(container).toHaveTextContent(
        `Sell Rate: ${currency.exchangeRate.sell} KES`
      );
    });
  });

  it("handles an empty list gracefully", () => {
    render(<CurrencyList currencies={[]} />);

    // Verify no currencies are rendered
    expect(screen.queryByText("Fiji Dollar")).not.toBeInTheDocument();
    expect(screen.queryByText("Mexican Peso")).not.toBeInTheDocument();
    expect(screen.queryByText("Kenyan Shilling")).not.toBeInTheDocument();

    // Ensure no placeholders or rates are rendered
    expect(screen.queryAllByText("No Flag").length).toBe(0);
    expect(screen.queryByText("Buy Rate")).not.toBeInTheDocument();
    expect(screen.queryByText("Sell Rate")).not.toBeInTheDocument();
  });
});
