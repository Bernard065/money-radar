import { render, screen } from "@testing-library/react";

import Header from "@/components/Header";

describe("Header Component", () => {
  it("should render the header with the correct title", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();

    const titleElement = screen.getByText(/Currency Exchange Rates/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should have the correct classes for styling", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("bg-blue-600");
    expect(headerElement).toHaveClass("py-4");
    expect(headerElement).toHaveClass("text-center");
    expect(headerElement).toHaveClass("text-white");
  });

  it("should display the h1 element with the correct styles", () => {
    render(<Header />);

    const h1Element = screen.getByRole("heading", { level: 1 });
    expect(h1Element).toHaveClass("text-xl");
    expect(h1Element).toHaveClass("font-bold");
  });
});
