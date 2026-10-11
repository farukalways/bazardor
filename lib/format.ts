export const bn = (n: number | string, d?: number): string =>
  Number(n).toLocaleString("bn-BD", d ? { minimumFractionDigits: d, maximumFractionDigits: d } : undefined);

const U: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  hali: "হালি"
};

export const unitBn = (u: string): string => "প্রতি " + (U[String(u).toLowerCase()] || u);