/**
 * @param score A decimal score between 0 and 1 to format as a percentage.
 * @returns The (string) formatted score as a 4 significant figures percentage.
 *
 * @example
 * formatScore(0.123456789); // "12.35%"
 */
export function formatScore(score: number): string {
  return `${(score * 100).toPrecision(4)}%`;
}
