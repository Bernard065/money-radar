export interface ExchangeRate {
  buy?: number;
  middle?: number;
  sell?: number;
}

export interface Currency {
  currency: string;
  nameI18N: string;
  exchangeRate: ExchangeRate;
  flags: string;
}
