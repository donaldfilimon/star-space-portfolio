/** 1-based, zero-padded ordinal for display: 0 → "01", 9 → "10". */
export function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}
