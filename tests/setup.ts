import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia (not implemented in jsdom)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver as a class constructor (used by Recharts and @dnd-kit)
global.ResizeObserver = class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
} as unknown as typeof ResizeObserver

// Mock IntersectionObserver as a class constructor (used by some Radix UI components)
global.IntersectionObserver = class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
} as unknown as typeof IntersectionObserver

// Suppress Recharts warnings about width/height in test environment.
// Capture the original before installing the spy to avoid recursion.
const _originalConsoleWarn = console.warn.bind(console)
vi.spyOn(console, 'warn').mockImplementation((...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('Recharts')) return
  _originalConsoleWarn(...args)
})
