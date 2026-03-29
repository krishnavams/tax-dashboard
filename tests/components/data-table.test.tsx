import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DataTable, schema } from '@/components/data-table'
import { z } from 'zod'

// Mock sonner - toast is called in form onSubmit handlers
vi.mock('sonner', () => ({
  toast: { promise: vi.fn(), success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}))

// Mock recharts to avoid SVG layout issues in jsdom.
// Use importOriginal so that all other exports (Tooltip, etc.) remain intact.
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>()
  return {
    ...actual,
    AreaChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="area-chart">{children}</div>
    ),
    Area: () => null,
    CartesianGrid: () => null,
    XAxis: () => null,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  }
})

type TableRow = z.infer<typeof schema>

const makeRow = (i: number): TableRow => ({
  id: i,
  header: `Section ${i}`,
  type: i % 2 === 0 ? 'Executive Summary' : 'Technical Approach',
  status: i % 3 === 0 ? 'Done' : 'In Progress',
  target: `${i * 100}`,
  limit: `${i * 200}`,
  reviewer: i % 2 === 0 ? 'Eddie Lake' : 'Assign reviewer',
})

const makeData = (count: number): TableRow[] =>
  Array.from({ length: count }, (_, i) => makeRow(i + 1))

// ─── Schema validation ────────────────────────────────────────────────────────

describe('schema', () => {
  it('accepts a valid row object', () => {
    const result = schema.safeParse(makeRow(1))
    expect(result.success).toBe(true)
  })

  it('rejects a row with a string id', () => {
    const result = schema.safeParse({ ...makeRow(1), id: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects a row missing required fields', () => {
    const result = schema.safeParse({ id: 1, header: 'Only Header' })
    expect(result.success).toBe(false)
  })

  it('rejects a row with a numeric header', () => {
    const result = schema.safeParse({ ...makeRow(1), header: 42 })
    expect(result.success).toBe(false)
  })

  it('rejects a completely empty object', () => {
    const result = schema.safeParse({})
    expect(result.success).toBe(false)
  })
})

// ─── DataTable rendering ──────────────────────────────────────────────────────

describe('DataTable', () => {
  it('renders rows from the provided data', () => {
    render(<DataTable data={makeData(3)} />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('shows "No results." when the data array is empty', () => {
    render(<DataTable data={[]} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('renders column header labels', () => {
    render(<DataTable data={makeData(1)} />)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Section Type')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    // "Reviewer" appears in both the column header <th> and the drawer form label
    expect(screen.getAllByText('Reviewer').length).toBeGreaterThan(0)
  })

  it('renders a "Done" status badge', () => {
    render(<DataTable data={[makeRow(3)]} />) // id=3 → status 'Done'
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders an "In Progress" status badge', () => {
    render(<DataTable data={[makeRow(1)]} />) // id=1 → status 'In Progress'
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('renders a reviewer name when assigned', () => {
    render(<DataTable data={[makeRow(2)]} />) // id=2 → reviewer 'Eddie Lake'
    expect(screen.getByText('Eddie Lake')).toBeInTheDocument()
  })

  it('renders the Customize Columns button', () => {
    render(<DataTable data={makeData(1)} />)
    expect(
      screen.getByRole('button', { name: /customize columns|columns/i })
    ).toBeInTheDocument()
  })

  it('renders the Add Section button', () => {
    render(<DataTable data={makeData(1)} />)
    expect(
      screen.getByRole('button', { name: /add section/i })
    ).toBeInTheDocument()
  })

  it('renders the tab list with Outline tab', () => {
    render(<DataTable data={makeData(1)} />)
    expect(screen.getByRole('tab', { name: /outline/i })).toBeInTheDocument()
  })
})

// ─── Pagination ───────────────────────────────────────────────────────────────

describe('DataTable pagination', () => {
  it('shows page indicator starting at page 1', () => {
    render(<DataTable data={makeData(15)} />)
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument()
  })

  it('only renders the first page of rows (default page size 10)', () => {
    render(<DataTable data={makeData(15)} />)
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 10')).toBeInTheDocument()
    expect(screen.queryByText('Section 11')).not.toBeInTheDocument()
  })

  it('disables the Previous Page button on the first page', () => {
    render(<DataTable data={makeData(15)} />)
    expect(
      screen.getByRole('button', { name: /go to previous page/i })
    ).toBeDisabled()
  })

  it('enables the Next Page button when there are multiple pages', () => {
    render(<DataTable data={makeData(15)} />)
    expect(
      screen.getByRole('button', { name: /go to next page/i })
    ).not.toBeDisabled()
  })

  it('disables both navigation buttons when all rows fit on one page', () => {
    render(<DataTable data={makeData(5)} />)
    expect(
      screen.getByRole('button', { name: /go to previous page/i })
    ).toBeDisabled()
    expect(
      screen.getByRole('button', { name: /go to next page/i })
    ).toBeDisabled()
  })

  it('advances to the next page on Next click', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(15)} />)

    await user.click(screen.getByRole('button', { name: /go to next page/i }))

    expect(screen.getByText('Section 11')).toBeInTheDocument()
    expect(screen.queryByText('Section 1')).not.toBeInTheDocument()
  })

  it('goes back to the first page on Previous click after advancing', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(15)} />)

    await user.click(screen.getByRole('button', { name: /go to next page/i }))
    await user.click(screen.getByRole('button', { name: /go to previous page/i }))

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.queryByText('Section 11')).not.toBeInTheDocument()
  })

  it('jumps to the last page via the Last Page button', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(15)} />)

    await user.click(screen.getByRole('button', { name: /go to last page/i }))

    expect(screen.getByText('Section 11')).toBeInTheDocument()
  })

  it('returns to the first page via the First Page button', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(15)} />)

    // Navigate away first
    await user.click(screen.getByRole('button', { name: /go to next page/i }))
    await user.click(screen.getByRole('button', { name: /go to first page/i }))

    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.queryByText('Section 11')).not.toBeInTheDocument()
  })
})

// ─── Row selection ────────────────────────────────────────────────────────────

describe('DataTable row selection', () => {
  it('shows 0 rows selected initially', () => {
    render(<DataTable data={makeData(3)} />)
    expect(screen.getByText(/0 of 3 row\(s\) selected/)).toBeInTheDocument()
  })

  it('selecting a row increments the selected count', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(3)} />)

    const rowCheckboxes = screen.getAllByRole('checkbox', {
      name: /select row/i,
    })
    await user.click(rowCheckboxes[0])

    expect(screen.getByText(/1 of 3 row\(s\) selected/)).toBeInTheDocument()
  })

  it('selecting all rows via header checkbox updates count', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(3)} />)

    const selectAllCheckbox = screen.getByRole('checkbox', {
      name: /select all/i,
    })
    await user.click(selectAllCheckbox)

    expect(screen.getByText(/3 of 3 row\(s\) selected/)).toBeInTheDocument()
  })

  it('deselecting a row decrements the selected count', async () => {
    const user = userEvent.setup()
    render(<DataTable data={makeData(3)} />)

    const rowCheckboxes = screen.getAllByRole('checkbox', { name: /select row/i })
    await user.click(rowCheckboxes[0])
    await user.click(rowCheckboxes[0])

    expect(screen.getByText(/0 of 3 row\(s\) selected/)).toBeInTheDocument()
  })
})
