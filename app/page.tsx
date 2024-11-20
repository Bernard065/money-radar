// app/page.tsx
import { Suspense } from "react";

import CurrencyPage from "@/components/CurrencyPage";

// Server-side data fetching
async function fetchCurrencies() {
  const response = await fetch("http://localhost:3000//data/fx.json");
  if (!response.ok) {
    throw new Error("Failed to fetch currency data.");
  }
  const data = await response.json();
  return data.fx.map((fx: any) => ({
    currency: fx.currency,
    nameI18N: fx.nameI18N,
    exchangeRate: fx.exchangeRate,
    flags: fx.flags,
  }));
}

export default async function Home() {
  const currencies = await fetchCurrencies();

  return (
    <Suspense fallback={<p>Loading currencies...</p>}>
      <CurrencyPage initialCurrencies={currencies} />
    </Suspense>
  );
}
