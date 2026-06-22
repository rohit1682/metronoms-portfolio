import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('framer-motion', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_target, tag: string) =>
      React.forwardRef(({ children, ...props }: React.ComponentProps<'div'>, ref: React.Ref<HTMLDivElement>) =>
        React.createElement(String(tag), { ...props, ref }, children),
      ),
  }),
  useScroll: () => ({ scrollYProgress: 0 }),
  useSpring: (v: unknown) => v,
}));

// ── Component under test ──────────────────────────────────────────────────────

import ScrollProgressBar from './ScrollProgressBar';

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('ScrollProgressBar', () => {
  it('renders without throwing', () => {
    expect(() => render(<ScrollProgressBar />)).not.toThrow();
  });

  it('renders a single fixed bar element', () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar).toBeInTheDocument();
    expect(bar.style.position).toBe('fixed');
  });

  it('bar is anchored at the top of the viewport', () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.style.top).toBe('0px');
    expect(bar.style.left).toBe('0px');
  });

  it('has a height of 2px', () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.style.height).toBe('2px');
  });

  it('has a pointer-events of none so it does not block clicks', () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.firstElementChild as HTMLElement;
    expect(bar.style.pointerEvents).toBe('none');
  });
});
