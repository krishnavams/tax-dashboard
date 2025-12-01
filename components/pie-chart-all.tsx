"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChartRadarVolumeFYWithDropdown } from "./ui/radar"

export const description =
  "Tax value distribution with period and tax filters"

// ---------------------------------------------------------
// Base monthly data for one financial year (Apr–Mar)
// Replace these with your actual values (₹ lakhs/crores etc.)
// ---------------------------------------------------------
const monthlyTaxData = [
  {
    month: "Apr",
    index: 1,
    gst: 520,
    cbdt: 430,
    telangana: 210,
    assam: 150,
    meghalaya: 90,
    icegate: 60,
  },
  {
    month: "May",
    index: 2,
    gst: 540,
    cbdt: 440,
    telangana: 220,
    assam: 155,
    meghalaya: 92,
    icegate: 62,
  },
  {
    month: "Jun",
    index: 3,
    gst: 560,
    cbdt: 450,
    telangana: 230,
    assam: 160,
    meghalaya: 95,
    icegate: 65,
  },
  {
    month: "Jul",
    index: 4,
    gst: 580,
    cbdt: 460,
    telangana: 240,
    assam: 165,
    meghalaya: 97,
    icegate: 68,
  },
  {
    month: "Aug",
    index: 5,
    gst: 600,
    cbdt: 470,
    telangana: 250,
    assam: 170,
    meghalaya: 100,
    icegate: 70,
  },
  {
    month: "Sep",
    index: 6,
    gst: 620,
    cbdt: 480,
    telangana: 260,
    assam: 175,
    meghalaya: 102,
    icegate: 72,
  },
  {
    month: "Oct",
    index: 7,
    gst: 640,
    cbdt: 490,
    telangana: 270,
    assam: 180,
    meghalaya: 105,
    icegate: 75,
  },
  {
    month: "Nov",
    index: 8,
    gst: 660,
    cbdt: 500,
    telangana: 280,
    assam: 185,
    meghalaya: 107,
    icegate: 78,
  },
  {
    month: "Dec",
    index: 9,
    gst: 680,
    cbdt: 510,
    telangana: 290,
    assam: 190,
    meghalaya: 110,
    icegate: 80,
  },
  {
    month: "Jan",
    index: 10,
    gst: 700,
    cbdt: 520,
    telangana: 300,
    assam: 195,
    meghalaya: 112,
    icegate: 82,
  },
  {
    month: "Feb",
    index: 11,
    gst: 720,
    cbdt: 530,
    telangana: 310,
    assam: 200,
    meghalaya: 115,
    icegate: 85,
  },
  {
    month: "Mar",
    index: 12,
    gst: 740,
    cbdt: 540,
    telangana: 320,
    assam: 205,
    meghalaya: 118,
    icegate: 88,
  },
] as const

// ---------------------------------------------------------
// Config & helpers
// ---------------------------------------------------------
const chartConfig = {
  gst: { label: "GST", color: "var(--chart-1)" },
  cbdt: { label: "CBDT", color: "var(--chart-2)" },
  telangana: { label: "Telangana", color: "var(--chart-3)" },
  assam: { label: "Assam", color: "var(--chart-4)" },
  meghalaya: { label: "Meghalaya", color: "var(--chart-5)" },
  icegate: { label: "ICEGATE", color: "var(--chart-6)" },
} satisfies ChartConfig

const TAX_KEYS = [
  "gst",
  "cbdt",
  "telangana",
  "assam",
  "meghalaya",
  "icegate",
] as const
type TaxKey = (typeof TAX_KEYS)[number]

const taxLabels: Record<TaxKey, string> = {
  gst: "GST",
  cbdt: "CBDT",
  telangana: "Telangana",
  assam: "Assam",
  meghalaya: "Meghalaya",
  icegate: "ICEGATE",
}

// view granularity
const GRANULARITY_OPTIONS = [
  { value: "year", label: "Yearly" },
  { value: "half", label: "Half-yearly" },
  { value: "quarter", label: "Quarterly" },
  { value: "month", label: "Monthly" },
] as const

type Granularity = (typeof GRANULARITY_OPTIONS)[number]["value"]

// period options for each granularity
const PERIOD_OPTIONS: Record<Granularity, { value: string; label: string }[]> =
  {
    year: [{ value: "FY24-25", label: "FY 2024–25" }],
    half: [
      { value: "H1", label: "H1 (Apr–Sep)" },
      { value: "H2", label: "H2 (Oct–Mar)" },
    ],
    quarter: [
      { value: "Q1", label: "Q1 (Apr–Jun)" },
      { value: "Q2", label: "Q2 (Jul–Sep)" },
      { value: "Q3", label: "Q3 (Oct–Dec)" },
      { value: "Q4", label: "Q4 (Jan–Mar)" },
    ],
    month: monthlyTaxData.map((m) => ({ value: m.month, label: m.month })),
  }

// helper to map period → month indexes
function getMonthIndexesForPeriod(
  granularity: Granularity,
  period: string,
): number[] {
  switch (granularity) {
    case "year":
      return monthlyTaxData.map((m) => m.index)
    case "half":
      if (period === "H1") return [1, 2, 3, 4, 5, 6]
      if (period === "H2") return [7, 8, 9, 10, 11, 12]
      return []
    case "quarter":
      if (period === "Q1") return [1, 2, 3]
      if (period === "Q2") return [4, 5, 6]
      if (period === "Q3") return [7, 8, 9]
      if (period === "Q4") return [10, 11, 12]
      return []
    case "month": {
      const monthObj = monthlyTaxData.find((m) => m.month === period)
      return monthObj ? [monthObj.index] : []
    }
    default:
      return []
  }
}

type TaxFilter = "all" | TaxKey

// ---------------------------------------------------------
// Component
// ---------------------------------------------------------
export function ChartPieDonutTextTax() {
  const [granularity, setGranularity] = React.useState<Granularity>("year")
  const [period, setPeriod] = React.useState<string>("FY24-25")
  const [taxFilter, setTaxFilter] = React.useState<TaxFilter>("all")

  // when granularity changes, reset period if needed
  React.useEffect(() => {
    const first = PERIOD_OPTIONS[granularity][0]
    if (first && !PERIOD_OPTIONS[granularity].some((p) => p.value === period)) {
      setPeriod(first.value)
    }
  }, [granularity, period])

  const { pieData, totalValue, periodLabel, titleLabel } = React.useMemo(() => {
    const idxs = getMonthIndexesForPeriod(granularity, period)

    // sum all taxes for selected months
    const totals: Record<TaxKey, number> = {
      gst: 0,
      cbdt: 0,
      telangana: 0,
      assam: 0,
      meghalaya: 0,
      icegate: 0,
    }

    monthlyTaxData
      .filter((m) => idxs.includes(m.index))
      .forEach((row) => {
        TAX_KEYS.forEach((key) => {
          totals[key] += row[key]
        })
      })

    let pieData:
      | { key: string; category: string; value: number; fill: string }[]
      | []
    let titleLabel = ""

    if (taxFilter === "all") {
      // All taxes → each tax as slice
      pieData = TAX_KEYS.map((key) => ({
        key,
        category: taxLabels[key],
        value: totals[key],
        fill: `var(--color-${key})`,
      }))
      titleLabel = "All Taxes"
    } else {
      // Specific tax → that tax vs Others
      const selectedValue = totals[taxFilter]
      const othersValue =
        TAX_KEYS.filter((k) => k !== taxFilter).reduce(
          (acc, k) => acc + totals[k],
          0,
        )

      pieData = [
        {
          key: taxFilter,
          category: taxLabels[taxFilter],
          value: selectedValue,
          fill: `var(--color-${taxFilter})`,
        },
        {
          key: "others",
          category: "Others",
          value: othersValue,
          fill: "var(--chart-muted)",
        },
      ]
      titleLabel = taxLabels[taxFilter]
    }

    const totalValue = pieData.reduce((acc, item) => acc + item.value, 0)

    const labelObj =
      PERIOD_OPTIONS[granularity].find((p) => p.value === period) ??
      PERIOD_OPTIONS[granularity][0]

    return {
      pieData,
      totalValue,
      periodLabel: labelObj?.label ?? "",
      titleLabel,
    }
  }, [granularity, period, taxFilter])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-2 space-y-3">
        <CardTitle>Tax Value Distribution</CardTitle>
        <CardDescription>
          Values for GST, CBDT, Telangana, Assam, Meghalaya, ICEGATE
        </CardDescription>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Granularity dropdown */}
          <Select
            value={granularity}
            onValueChange={(v) => setGranularity(v as Granularity)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="View by" />
            </SelectTrigger>
            <SelectContent>
              {GRANULARITY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Period dropdown */}
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS[granularity].map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tax filter dropdown */}
          <Select
            value={taxFilter}
            onValueChange={(v) => setTaxFilter(v as TaxFilter)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Tax filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Taxes</SelectItem>
              <SelectItem value="gst">GST</SelectItem>
              <SelectItem value="cbdt">CBDT</SelectItem>
              <SelectItem value="telangana">Telangana</SelectItem>
              <SelectItem value="assam">Assam</SelectItem>
              <SelectItem value="meghalaya">Meghalaya</SelectItem>
              <SelectItem value="icegate">ICEGATE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={(value) =>
                    `₹ ${Number(value || 0).toLocaleString()}`
                  }
                />
              }
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ₹ {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 18}
                          className="fill-muted-foreground text-xs"
                        >
                          {titleLabel}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 34}
                          className="fill-muted-foreground text-[11px]"
                        >
                          {periodLabel}
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-1 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Value trending up this period <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {titleLabel} · {periodLabel}
        </div>
      </CardFooter>
    </Card>
  )
}


export function ChartPieDonutTextTaxWithRadar() {
    return <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <ChartPieDonutTextTax />
        <ChartRadarVolumeFYWithDropdown />
    </div>
}

