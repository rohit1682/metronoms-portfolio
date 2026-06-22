/** Pick a uniformly random element from an array. Returns undefined for empty arrays. */
export function randomItem<T>(arr: readonly T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Return a random integer in [0, len). Safe fallback to 0 for len ≤ 1. */
export function randomIndex(len: number): number {
  return len > 1 ? Math.floor(Math.random() * len) : 0;
}

/**
 * Return a shallow-copied, Fisher-Yates shuffled version of the array.
 * Original array is not mutated.
 */
export function shuffled<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * Pick `count` unique random items from an array.
 * Returns up to arr.length items if count > arr.length.
 */
export function randomSample<T>(arr: readonly T[], count: number): T[] {
  return shuffled(arr).slice(0, count);
}
