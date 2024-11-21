import CurrencyPage from "@/components/CurrencyPage";
import { Currency } from "@/types";

async function fetchCurrencies() {
  try {
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
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
}

const Home = async () => {
  const currencies = await fetchCurrencies();
  return <CurrencyPage initialCurrencies={currencies} />;
};

export default Home;
