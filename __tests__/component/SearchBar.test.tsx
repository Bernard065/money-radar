// SearchBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from "@/components/SearchBar";

const mockOnSearch = jest.fn();

describe("SearchBar Component", () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("should render the search input", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Search currencies.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it("should initialize search term from URL hash", () => {
    window.location.hash = "#usd";

    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Search currencies.../i);
    expect(inputElement).toHaveValue("usd");
    expect(mockOnSearch).toHaveBeenCalledWith("usd");
  });

  it("should update the search term and call onSearch when the input changes", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Search currencies.../i);

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: "eur" } });

    expect(inputElement).toHaveValue("eur");

    expect(mockOnSearch).toHaveBeenCalledWith("eur");

    expect(window.location.hash).toBe("#eur");
  });

  it("should not trigger onSearch immediately after typing if the term is the same", () => {
    render(<SearchBar onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText(/Search currencies.../i);

    fireEvent.change(inputElement, { target: { value: "usd" } });

    // Check the onSearch callback is called once
    expect(mockOnSearch).toHaveBeenCalledWith("usd");

    fireEvent.change(inputElement, { target: { value: "usd" } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
