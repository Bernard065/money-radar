import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

jest.mock("@/components/CurrencyPage", () =>
  jest.fn(() => <div>Mocked CurrencyPage</div>)
);

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the CurrencyPage component with fetched data", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        fx: [
          {
            currency: "USD",
            exchangeRate: { middle: 1.1349 },
            nameI18N: "US Dollar",
            flags: "/flags/usa.png",
          },
          {
            currency: "KES",
            exchangeRate: { middle: 115.8 },
            nameI18N: "Kenyan Shilling",
            flags: "/flags/ke.png",
          },
        ],
      }),
    } as Response);

    await render(<Home />);

    expect(await screen.findByText("Mocked CurrencyPage")).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/data/fx.json"
    );
  });

  it("handles fetch failure gracefully", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    await render(<Home />);

    expect(screen.queryByText("Mocked CurrencyPage")).not.toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/data/fx.json"
    );
  });
});
