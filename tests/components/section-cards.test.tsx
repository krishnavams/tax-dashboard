import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  StatCard,
  SectionCards,
  SectionCards1,
  SectionCards2,
} from '@/components/section-cards'

describe('StatCard', () => {
  const baseProps = {
    title: 'Test Metric',
    value: '₹50,000',
    change: 'Trending up this month',
    trendText: 'Last 6 months data',
    percentageIndicator: '15',
    isPositive: true,
  }

  it('renders the title', () => {
    render(<StatCard {...baseProps} />)
    expect(screen.getByText('Test Metric')).toBeInTheDocument()
  })

  it('renders the value', () => {
    render(<StatCard {...baseProps} />)
    expect(screen.getByText('₹50,000')).toBeInTheDocument()
  })

  it('renders the percentage indicator with % symbol', () => {
    render(<StatCard {...baseProps} />)
    expect(screen.getByText(/15%/)).toBeInTheDocument()
  })

  it('renders the change text', () => {
    render(<StatCard {...baseProps} />)
    expect(screen.getByText('Trending up this month')).toBeInTheDocument()
  })

  it('renders the trend text', () => {
    render(<StatCard {...baseProps} />)
    expect(screen.getByText('Last 6 months data')).toBeInTheDocument()
  })

  it('renders trending up icons when isPositive is true', () => {
    const { container } = render(<StatCard {...baseProps} isPositive={true} />)
    // tabler icons render as SVG; check for at least one SVG in the card
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('renders trending down icons when isPositive is false', () => {
    const { container } = render(
      <StatCard {...baseProps} isPositive={false} change="Down this month" />
    )
    const svgs = container.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
    expect(screen.getByText('Down this month')).toBeInTheDocument()
  })

  it('renders correctly with zero percentage', () => {
    render(<StatCard {...baseProps} percentageIndicator="0" value="₹0" />)
    expect(screen.getByText('₹0')).toBeInTheDocument()
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })
})

describe('SectionCards', () => {
  it('renders all four card titles', () => {
    render(<SectionCards />)
    expect(screen.getByText('Total Tax Amount')).toBeInTheDocument()
    expect(screen.getByText('Total Tax Volume')).toBeInTheDocument()
    expect(screen.getByText('Commission')).toBeInTheDocument()
    expect(screen.getByText('Growth Rate')).toBeInTheDocument()
  })

  it('renders the correct tax amount value', () => {
    render(<SectionCards />)
    expect(screen.getByText('₹322,594')).toBeInTheDocument()
  })

  it('renders the correct tax volume value', () => {
    render(<SectionCards />)
    expect(screen.getByText('3058')).toBeInTheDocument()
  })

  it('renders the correct commission value', () => {
    render(<SectionCards />)
    expect(screen.getByText('₹1,12,250')).toBeInTheDocument()
  })

  it('renders the correct growth rate value', () => {
    render(<SectionCards />)
    // "22.5%" appears both as a card value and as badge indicators
    const matches = screen.getAllByText(/22\.5%/)
    expect(matches.length).toBeGreaterThan(0)
  })
})

describe('SectionCards1', () => {
  it('renders FY25 card titles', () => {
    render(<SectionCards1 />)
    expect(screen.getByText('FY25 Tax Amount')).toBeInTheDocument()
    expect(screen.getByText('FY25 Tax Volume')).toBeInTheDocument()
  })

  it('renders the FY25 tax amount value', () => {
    render(<SectionCards1 />)
    expect(screen.getByText('₹222,594')).toBeInTheDocument()
  })

  it('renders the FY25 tax volume value', () => {
    render(<SectionCards1 />)
    expect(screen.getByText('2075')).toBeInTheDocument()
  })

  it('renders Commission and Growth Rate titles', () => {
    render(<SectionCards1 />)
    expect(screen.getByText('Commission')).toBeInTheDocument()
    expect(screen.getByText('Growth Rate')).toBeInTheDocument()
  })
})

describe('SectionCards2', () => {
  it('renders FY26 card titles', () => {
    render(<SectionCards2 />)
    expect(screen.getByText('FY26 Tax Amount')).toBeInTheDocument()
    expect(screen.getByText('FY26 Tax Volume')).toBeInTheDocument()
  })

  it('renders zero placeholder values', () => {
    render(<SectionCards2 />)
    // Multiple zero values and dash placeholders are expected
    const zeroValues = screen.getAllByText('₹0')
    expect(zeroValues.length).toBeGreaterThanOrEqual(2)
  })

  it('renders dash placeholder for change and trendText', () => {
    render(<SectionCards2 />)
    const dashes = screen.getAllByText('-')
    expect(dashes.length).toBeGreaterThan(0)
  })
})
