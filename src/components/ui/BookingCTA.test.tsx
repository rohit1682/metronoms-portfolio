import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn();
let mockPathname = '/';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: mockPathname }),
  };
});

vi.mock('framer-motion', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_target, tag: string) =>
      React.forwardRef(
        ({ children, ...props }: React.ComponentProps<'button'>, ref: React.Ref<HTMLButtonElement>) =>
          React.createElement(String(tag), { ...props, ref }, children),
      ),
  }),
}));

// ── Component under test ──────────────────────────────────────────────────────

import BookingCTA from './BookingCTA';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Provide a fresh isolated scrollIntoView mock for every test. */
function mockContact() {
  const scrollIntoView = vi.fn();
  const getByIdSpy = vi
    .spyOn(document, 'getElementById')
    .mockReturnValue({ scrollIntoView } as unknown as HTMLElement);
  return { scrollIntoView, restore: () => getByIdSpy.mockRestore() };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  mockPathname = '/';
  mockNavigate.mockClear();
});

// ─── Visibility ──────────────────────────────────────────────────────────────

describe('BookingCTA — visibility', () => {
  it('renders null on the /highlights route', () => {
    mockPathname = '/highlights';
    const { container } = render(<BookingCTA />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the button on the root route', () => {
    render(<BookingCTA />);
    expect(screen.getByTitle('Book Metronorms')).toBeInTheDocument();
  });

  it('renders the button on non-highlights routes', () => {
    mockPathname = '/story';
    render(<BookingCTA />);
    expect(screen.getByTitle('Book Metronorms')).toBeInTheDocument();
  });

  it('renders the "Book Us" label', () => {
    render(<BookingCTA />);
    expect(screen.getByText('Book Us')).toBeInTheDocument();
  });
});

// ─── Root-path click ─────────────────────────────────────────────────────────

describe('BookingCTA — click on root path (/)', () => {
  it('does NOT call navigate on the root path', () => {
    const { restore } = mockContact();
    render(<BookingCTA />);
    fireEvent.click(screen.getByTitle('Book Metronorms'));
    expect(mockNavigate).not.toHaveBeenCalled();
    restore();
  });

  it('calls scrollIntoView on #contact immediately', () => {
    const { scrollIntoView, restore } = mockContact();
    render(<BookingCTA />);
    fireEvent.click(screen.getByTitle('Book Metronorms'));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    restore();
  });
});

// ─── Non-root-path click ─────────────────────────────────────────────────────

describe('BookingCTA — click on non-root path', () => {
  beforeEach(() => { mockPathname = '/story'; });

  it('calls navigate("/") immediately', () => {
    const { restore } = mockContact();
    render(<BookingCTA />);
    fireEvent.click(screen.getByTitle('Book Metronorms'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
    restore();
  });

  it('scrolls to #contact after the deferred callback fires', () => {
    // Intercept setTimeout to capture the callback, then execute it manually.
    const captured: Array<() => void> = [];
    const setTimeoutSpy = vi
      .spyOn(window, 'setTimeout')
      .mockImplementation((fn: TimerHandler) => {
        captured.push(fn as () => void);
        return 0 as unknown as ReturnType<typeof setTimeout>;
      });

    const { scrollIntoView, restore } = mockContact();

    render(<BookingCTA />);
    fireEvent.click(screen.getByTitle('Book Metronorms'));

    // Nothing yet — the callback is deferred.
    expect(scrollIntoView).not.toHaveBeenCalled();

    // Fire all captured callbacks (the deferred scroll).
    captured.forEach((cb) => cb());
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    setTimeoutSpy.mockRestore();
    restore();
  });
});
