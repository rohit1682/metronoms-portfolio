import { describe, it, expect, vi } from 'vitest';
import { randomItem, randomIndex, shuffled, randomSample } from './random';

// ── randomItem ────────────────────────────────────────────────────────────────

describe('randomItem', () => {
  it('returns undefined for an empty array', () => {
    expect(randomItem([])).toBeUndefined();
  });

  it('returns the only element of a single-element array', () => {
    expect(randomItem([42])).toBe(42);
  });

  it('always returns an element that belongs to the source array', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(randomItem(arr));
    }
  });

  it('can return any element (distribution test over many draws)', () => {
    const arr = [1, 2, 3];
    const seen = new Set<number>();
    // With 300 draws, the probability of missing any element is negligible.
    for (let i = 0; i < 300; i++) {
      seen.add(randomItem(arr)!);
    }
    expect(seen.size).toBe(arr.length);
  });

  it('works with readonly arrays', () => {
    const arr = [10, 20, 30] as const;
    const result = randomItem(arr);
    expect([10, 20, 30]).toContain(result);
  });

  it('does not mutate the original array', () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    randomItem(arr);
    expect(arr).toEqual(copy);
  });
});

// ── randomIndex ───────────────────────────────────────────────────────────────

describe('randomIndex', () => {
  it('returns 0 when len is 0', () => {
    expect(randomIndex(0)).toBe(0);
  });

  it('returns 0 when len is 1', () => {
    expect(randomIndex(1)).toBe(0);
  });

  it('returns an integer in [0, len) when len > 1', () => {
    for (let i = 0; i < 200; i++) {
      const idx = randomIndex(5);
      expect(idx).toBeGreaterThanOrEqual(0);
      expect(idx).toBeLessThan(5);
      expect(Number.isInteger(idx)).toBe(true);
    }
  });

  it('can return any valid index across many calls', () => {
    const len = 4;
    const seen = new Set<number>();
    for (let i = 0; i < 400; i++) seen.add(randomIndex(len));
    expect(seen.size).toBe(len);
  });
});

// ── shuffled ──────────────────────────────────────────────────────────────────

describe('shuffled', () => {
  it('returns an empty array for an empty input', () => {
    expect(shuffled([])).toEqual([]);
  });

  it('returns a single-element array unchanged', () => {
    expect(shuffled([7])).toEqual([7]);
  });

  it('returns an array with the same elements (sorted)', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6];
    const result = shuffled(arr);
    expect(result.slice().sort((a, b) => a - b)).toEqual(
      arr.slice().sort((a, b) => a - b),
    );
  });

  it('returns the same length as the input', () => {
    const arr = [10, 20, 30, 40];
    expect(shuffled(arr)).toHaveLength(arr.length);
  });

  it('does NOT mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffled(arr);
    expect(arr).toEqual(copy);
  });

  it('produces a different order on most runs (randomness check)', () => {
    // With a 10-element array, the chance of getting the same order is 1/10! ≈ 0.
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const original = arr.join(',');
    let differentCount = 0;
    for (let i = 0; i < 20; i++) {
      if (shuffled(arr).join(',') !== original) differentCount++;
    }
    expect(differentCount).toBeGreaterThan(0);
  });

  it('works with Math.random mocked to 0 (always swaps with index 0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const arr = [1, 2, 3];
    const result = shuffled(arr);
    expect(result).toHaveLength(3);
    expect(result.sort()).toEqual([1, 2, 3]);
    vi.restoreAllMocks();
  });
});

// ── randomSample ──────────────────────────────────────────────────────────────

describe('randomSample', () => {
  it('returns an empty array when source is empty', () => {
    expect(randomSample([], 5)).toEqual([]);
  });

  it('returns an empty array when count is 0', () => {
    expect(randomSample([1, 2, 3], 0)).toEqual([]);
  });

  it('returns exactly count elements when count < arr.length', () => {
    const result = randomSample([1, 2, 3, 4, 5], 3);
    expect(result).toHaveLength(3);
  });

  it('returns all elements when count equals arr.length', () => {
    const arr = [1, 2, 3];
    const result = randomSample(arr, arr.length);
    expect(result).toHaveLength(arr.length);
    expect(result.sort()).toEqual([...arr].sort());
  });

  it('returns at most arr.length elements when count > arr.length', () => {
    const arr = [1, 2, 3];
    const result = randomSample(arr, 100);
    expect(result).toHaveLength(arr.length);
  });

  it('every returned element belongs to the source array', () => {
    const arr = ['x', 'y', 'z', 'w'];
    const result = randomSample(arr, 2);
    result.forEach((item) => expect(arr).toContain(item));
  });

  it('does NOT return duplicate elements', () => {
    const arr = [10, 20, 30, 40, 50];
    for (let i = 0; i < 50; i++) {
      const result = randomSample(arr, 3);
      expect(new Set(result).size).toBe(result.length);
    }
  });

  it('does NOT mutate the original array', () => {
    const arr = [1, 2, 3, 4];
    const copy = [...arr];
    randomSample(arr, 2);
    expect(arr).toEqual(copy);
  });
});
