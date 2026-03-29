import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import {
  ChartPieDonutTextTax,
  getMonthIndexesForPeriod,
} from '@/components/pie-chart-all'

// Mock Recharts to avoid SVG layout issues in jsdom
vi.mock('recharts', () => ({
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <svg data-testid="pie-chart">{children}</svg>
  ),
  Pie: () => <g data-testid="pie" />,
  Label: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

// Mock ChartContainer and tooltip (wraps ResponsiveContainer)
vi.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="chart-container">{children}</div>
  ),
  ChartTooltip: () => null,
  ChartTooltipContent: () => null,
}))

// Mock the Radar sub-component rendered by ChartPieDonutTextTaxWithRadar
vi.mock('@/components/ui/radar', () => ({
  ChartRadarVolumeFYWithDropdown: () => (
    <div data-testid="radar-chart" />
  ),
}))

// ─── getMonthIndexesForPeriod (pure function) ─────────────────────────────────

describe('getMonthIndexesForPeriod', () => {
  describe('yearly granularity', () => {
    it('returns all 12 month indexes', () => {
      const result = getMonthIndexesForPeriod('year', 'FY24-25')
      expect(result).toHaveLength(12)
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    })
  })

  describe('half-yearly granularity', () => {
    it('returns months 1–6 for H1', () => {
      expect(getMonthIndexesForPeriod('half', 'H1')).toEqual([1, 2, 3, 4, 5, 6])
    })

    it('returns months 7–12 for H2', () => {
      expect(getMonthIndexesForPeriod('half', 'H2')).toEqual([
        7, 8, 9, 10, 11, 12,
      ])
    })

    it('returns an empty array for an unknown half', () => {
      expect(getMonthIndexesForPeriod('half', 'H3')).toEqual([])
    })
  })

  describe('quarterly granularity', () => {
    it('returns months 1–3 for Q1', () => {
      expect(getMonthIndexesForPeriod('quarter', 'Q1')).toEqual([1, 2, 3])
    })

    it('returns months 4–6 for Q2', () => {
      expect(getMonthIndexesForPeriod('quarter', 'Q2')).toEqual([4, 5, 6])
    })

    it('returns months 7–9 for Q3', () => {
      expect(getMonthIndexesForPeriod('quarter', 'Q3')).toEqual([7, 8, 9])
    })

    it('returns months 10–12 for Q4', () => {
      expect(getMonthIndexesForPeriod('quarter', 'Q4')).toEqual([10, 11, 12])
    })

    it('returns an empty array for an unknown quarter', () => {
      expect(getMonthIndexesForPeriod('quarter', 'Q5')).toEqual([])
    })
  })

  describe('monthly granularity', () => {
    it('returns [1] for April (first month of FY)', () => {
      expect(getMonthIndexesForPeriod('month', 'Apr')).toEqual([1])
    })

    it('returns [12] for March (last month of FY)', () => {
      expect(getMonthIndexesForPeriod('month', 'Mar')).toEqual([12])
    })

    it('returns [6] for September', () => {
      expect(getMonthIndexesForPeriod('month', 'Sep')).toEqual([6])
    })

    it('returns [7] for October (start of H2)', () => {
      expect(getMonthIndexesForPeriod('month', 'Oct')).toEqual([7])
    })

    it('returns an empty array for an unrecognised month string', () => {
      expect(getMonthIndexesForPeriod('month', 'Invalid')).toEqual([])
    })
  })

  describe('period coverage correctness', () => {
    it('H1 and H2 together cover all 12 months without overlap', () => {
      const h1 = getMonthIndexesForPeriod('half', 'H1')
      const h2 = getMonthIndexesForPeriod('half', 'H2')
      const combined = [...h1, ...h2].sort((a, b) => a - b)
      expect(combined).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    })

    it('Q1–Q4 together cover all 12 months without overlap', () => {
      const allMonths = ['Q1', 'Q2', 'Q3', 'Q4']
        .flatMap((q) => getMonthIndexesForPeriod('quarter', q))
        .sort((a, b) => a - b)
      expect(allMonths).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    })

    it('each quarter contains exactly 3 months', () => {
      for (const q of ['Q1', 'Q2', 'Q3', 'Q4']) {
        expect(getMonthIndexesForPeriod('quarter', q)).toHaveLength(3)
      }
    })
  })
})

// ─── ChartPieDonutTextTax component ──────────────────────────────────────────

describe('ChartPieDonutTextTax', () => {
  it('renders the card title', () => {
    render(<ChartPieDonutTextTax />)
    expect(screen.getByText('Tax Value Distribution')).toBeInTheDocument()
  })

  it('renders the card description listing all tax types', () => {
    render(<ChartPieDonutTextTax />)
    expect(
      screen.getByText(/GST, CBDT, Telangana, Assam, Meghalaya, ICEGATE/)
    ).toBeInTheDocument()
  })

  it('renders the granularity select defaulting to Yearly', () => {
    render(<ChartPieDonutTextTax />)
    expect(screen.getByText('Yearly')).toBeInTheDocument()
  })

  it('renders the period select with the default FY label', () => {
    render(<ChartPieDonutTextTax />)
    expect(screen.getByText('FY 2024–25')).toBeInTheDocument()
  })

  it('renders the tax filter select defaulting to All Taxes', () => {
    render(<ChartPieDonutTextTax />)
    expect(screen.getByText('All Taxes')).toBeInTheDocument()
  })

  it('renders the footer trend text', () => {
    render(<ChartPieDonutTextTax />)
    expect(
      screen.getByText(/Value trending up this period/)
    ).toBeInTheDocument()
  })

  it('renders the pie chart container', () => {
    render(<ChartPieDonutTextTax />)
    expect(screen.getByTestId('chart-container')).toBeInTheDocument()
  })
})
