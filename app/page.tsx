import { use } from "react";

import CurrencyPage from "@/components/CurrencyPage";

interface ExchangeRate {
  buy?: number;
  middle?: number;
  sell?: number;
}

interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: ExchangeRate;
  flags: string;
}

async function fetchCurrencies() {
  const response = await fetch("http://localhost:3000/data/fx.json");
  if (!response.ok) {
    throw new Error("Failed to fetch currency data.");
  }

  const data = await response.json();

  // Find KES exchange rate to EUR
  const kesToEurRate = data.fx.find((fx: Currency) => fx.currency === "KES")
    ?.exchangeRate.middle;
  if (!kesToEurRate) throw new Error("KES exchange rate not found.");

  const kesToEur = 1 / kesToEurRate;

  // Normalize all currencies to KES
  return data.fx.map((fx: Currency) => {
    const buyRate = fx.exchangeRate?.buy ?? 0;
    const sellRate = fx.exchangeRate?.sell ?? 0;
    const middleRate = fx.exchangeRate?.middle ?? buyRate ?? sellRate ?? 0;

    return {
      currency: fx.currency,
      nameI18N: fx.nameI18N,
      exchangeRate: {
        buy: buyRate / kesToEur,
        sell: sellRate / kesToEur,
        middle: middleRate / kesToEur,
      },
      flags: fx.flags,
    };
  });
}

export default function Home() {
  // Using React's `use` hook to fetch data
  const currencies = use(fetchCurrencies()); // Automatically waits for the fetch to complete

  return <CurrencyPage initialCurrencies={currencies} />;
}
