import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('merges multiple classes', () => {
    expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold')
  })

  it('resolves Tailwind conflicts by keeping the last value', () => {
    // tailwind-merge deduplicates conflicting utilities
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('resolves padding conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })

  it('handles conditional classes with objects', () => {
    expect(cn('base', { 'text-bold': true, 'text-italic': false })).toBe('base text-bold')
  })

  it('handles conditional classes that are all false', () => {
    expect(cn('base', { 'text-bold': false })).toBe('base')
  })

  it('handles arrays of classes', () => {
    expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold')
  })

  it('handles undefined and null values gracefully', () => {
    expect(cn('text-sm', undefined, null, 'font-bold')).toBe('text-sm font-bold')
  })

  it('handles empty string input', () => {
    expect(cn('')).toBe('')
  })

  it('handles no arguments', () => {
    expect(cn()).toBe('')
  })

  it('deduplicates identical classes', () => {
    // clsx passes through, tailwind-merge deduplicates same utility
    expect(cn('text-sm', 'text-sm')).toBe('text-sm')
  })

  it('handles mixed array and object inputs', () => {
    const result = cn(['text-sm', 'font-bold'], { 'text-red-500': true })
    expect(result).toBe('text-sm font-bold text-red-500')
  })
})
