export default function formatCurrency(val: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(val);
}

export function formatCurrencyShort(value: number): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);

  let formatted: string;
  if (abs >= 1_000_000) {
    // Millions
    formatted = (abs / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (abs >= 1_000) {
    // Thousands
    formatted = (abs / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    // Under 1k – fall back to full pounds
    formatted = abs
      .toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/^£/, "");
  }

  return `${sign}£${formatted}`;
}
