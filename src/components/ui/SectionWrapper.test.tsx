import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('framer-motion', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_target, tag: string) =>
      React.forwardRef(({ children, ...props }: React.ComponentProps<'div'>, ref: React.Ref<HTMLDivElement>) =>
        React.createElement(String(tag), { ...props, ref }, children),
      ),
  }),
}));

// Make mockInView mutable so individual tests can flip the flag.
let mockInView = true;
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: vi.fn(), inView: mockInView }),
}));

// ── Component under test ──────────────────────────────────────────────────────

import SectionWrapper from './SectionWrapper';

// ── Tests ─────────────────────────────────────────────────────────────────────

beforeEach(() => { mockInView = true; });

describe('SectionWrapper — rendering', () => {
  it('renders its children', () => {
    render(<SectionWrapper>Hello World</SectionWrapper>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies the className prop to the root element', () => {
    const { container } = render(
      <SectionWrapper className="my-section">content</SectionWrapper>,
    );
    expect(container.firstElementChild).toHaveClass('my-section');
  });

  it('applies the id prop to the root element', () => {
    const { container } = render(
      <SectionWrapper id="about">content</SectionWrapper>,
    );
    expect(container.firstElementChild?.id).toBe('about');
  });

  it('renders with default props (no className or id) without error', () => {
    expect(() =>
      render(<SectionWrapper>Default</SectionWrapper>),
    ).not.toThrow();
  });

  it('renders nested React elements as children', () => {
    render(
      <SectionWrapper>
        <p data-testid="nested">Nested paragraph</p>
      </SectionWrapper>,
    );
    expect(screen.getByTestId('nested')).toBeInTheDocument();
  });

  it('accepts a delay prop without crashing', () => {
    expect(() =>
      render(<SectionWrapper delay={0.5}>Content</SectionWrapper>),
    ).not.toThrow();
  });
});

describe('SectionWrapper — inView branch coverage', () => {
  it('renders children when inView is true (visible animate state)', () => {
    mockInView = true;
    render(<SectionWrapper>Visible</SectionWrapper>);
    expect(screen.getByText('Visible')).toBeInTheDocument();
  });

  it('renders children when inView is false (hidden animate state)', () => {
    // Covers the { opacity: 0, y: 60 } branch of the ternary.
    mockInView = false;
    render(<SectionWrapper>Hidden</SectionWrapper>);
    expect(screen.getByText('Hidden')).toBeInTheDocument();
  });
});
