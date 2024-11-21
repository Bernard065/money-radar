import { render, screen, fireEvent } from "@testing-library/react";

import CurrencyPage from "@/components/CurrencyPage";
import { Currency } from "@/types";

const mockCurrencies: Currency[] = [
  {
    currency: "FJD",
    nameI18N: "Fiji Dollar",
    exchangeRate: { buy: 0, sell: 0 },
    flags: "",
  },
  {
    currency: "MXN",
    nameI18N: "Mexican Peso",
    exchangeRate: { buy: 0, sell: 0 },
    flags: "",
  },
  {
    currency: "KES",
    nameI18N: "Kenyan Shilling",
    exchangeRate: { buy: 0, sell: 0 },
    flags: "",
  },
];

describe("CurrencyPage Component", () => {
  test("renders the Header, SearchBar, and CurrencyList components", () => {
    render(<CurrencyPage initialCurrencies={mockCurrencies} />);

    // Check for Header
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // Check for SearchBar
    expect(screen.getByRole("textbox")).toBeInTheDocument();

    // Check for CurrencyList items
    expect(screen.getByText("Fiji Dollar")).toBeInTheDocument();
    expect(screen.getByText("Mexican Peso")).toBeInTheDocument();
    expect(screen.getByText("Kenyan Shilling")).toBeInTheDocument();
  });

  test("filters currencies based on search term", () => {
    render(<CurrencyPage initialCurrencies={mockCurrencies} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "fiji" } });

    expect(screen.getByText("Fiji Dollar")).toBeInTheDocument();
    expect(screen.queryByText("Mexican Peso")).not.toBeInTheDocument();
    expect(screen.queryByText("Kenyan Shilling")).not.toBeInTheDocument();
  });

  test("displays all currencies when search term is cleared", () => {
    render(<CurrencyPage initialCurrencies={mockCurrencies} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "fiji" } });

    fireEvent.change(inputElement, { target: { value: "" } });

    expect(screen.getByText("Fiji Dollar")).toBeInTheDocument();
    expect(screen.getByText("Mexican Peso")).toBeInTheDocument();
    expect(screen.getByText("Kenyan Shilling")).toBeInTheDocument();
  });
});
