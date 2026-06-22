import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from './useIsMobile';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeMediaQuery(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mq = {
    matches,
    media: '(max-width: 768px)',
    addEventListener: vi.fn((_type: string, fn: (e: MediaQueryListEvent) => void) => {
      listeners.push(fn);
    }),
    removeEventListener: vi.fn((_type: string, fn: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    }),
    dispatchEvent: vi.fn(),
    /** Fire a synthetic change event for testing. */
    triggerChange(newMatches: boolean) {
      listeners.forEach((fn) =>
        fn({ matches: newMatches, media: mq.media } as MediaQueryListEvent),
      );
    },
  };
  return mq;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

afterEach(() => vi.restoreAllMocks());

describe('useIsMobile — initial state', () => {
  it('returns true when window.innerWidth ≤ 768', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('returns false when window.innerWidth > 768', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1440 });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});

describe('useIsMobile — matchMedia listener', () => {
  it('registers a "change" event listener on mount', () => {
    const mq = makeMediaQuery(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mq as unknown as MediaQueryList);

    renderHook(() => useIsMobile());

    expect(mq.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('removes the "change" event listener on unmount', () => {
    const mq = makeMediaQuery(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mq as unknown as MediaQueryList);

    const { unmount } = renderHook(() => useIsMobile());
    unmount();

    expect(mq.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('updates to true when media query fires with matches=true', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1440 });
    const mq = makeMediaQuery(false);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mq as unknown as MediaQueryList);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => mq.triggerChange(true));
    expect(result.current).toBe(true);
  });

  it('updates to false when media query fires with matches=false', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 375 });
    const mq = makeMediaQuery(true);
    vi.spyOn(window, 'matchMedia').mockReturnValue(mq as unknown as MediaQueryList);

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);

    act(() => mq.triggerChange(false));
    expect(result.current).toBe(false);
  });
});
