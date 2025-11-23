"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { ChartPieDonutTextTax } from "./pie-chart"

export const description =
  "Month-wise comparison: previous vs current year tax collections"

// Sample data – replace with your real values (can be in lakhs/crores etc.)
const chartData = [
  {
    month: "January",
    gst_prev: 120,
    gst_curr: 150,
    cbdt_prev: 110,
    cbdt_curr: 140,
    telangana_prev: 60,
    telangana_curr: 80,
    assam_prev: 40,
    assam_curr: 55,
    meghalaya_prev: 25,
    meghalaya_curr: 35,
  },
  {
    month: "February",
    gst_prev: 130,
    gst_curr: 160,
    cbdt_prev: 115,
    cbdt_curr: 145,
    telangana_prev: 65,
    telangana_curr: 85,
    assam_prev: 42,
    assam_curr: 57,
    meghalaya_prev: 27,
    meghalaya_curr: 37,
  },
  {
    month: "March",
    gst_prev: 150,
    gst_curr: 180,
    cbdt_prev: 130,
    cbdt_curr: 165,
    telangana_prev: 70,
    telangana_curr: 95,
    assam_prev: 48,
    assam_curr: 65,
    meghalaya_prev: 30,
    meghalaya_curr: 42,
  },
  {
    month: "April",
    gst_prev: 140,
    gst_curr: 175,
    cbdt_prev: 125,
    cbdt_curr: 160,
    telangana_prev: 68,
    telangana_curr: 92,
    assam_prev: 46,
    assam_curr: 62,
    meghalaya_prev: 29,
    meghalaya_curr: 40,
  },
  {
    month: "May",
    gst_prev: 155,
    gst_curr: 190,
    cbdt_prev: 135,
    cbdt_curr: 175,
    telangana_prev: 75,
    telangana_curr: 100,
    assam_prev: 50,
    assam_curr: 70,
    meghalaya_prev: 32,
    meghalaya_curr: 45,
  },
  {
    month: "June",
    gst_prev: 160,
    gst_curr: 200,
    cbdt_prev: 140,
    cbdt_curr: 185,
    telangana_prev: 80,
    telangana_curr: 110,
    assam_prev: 52,
    assam_curr: 75,
    meghalaya_prev: 34,
    meghalaya_curr: 48,
  },
]

// Colors for the series (mapped to CSS vars by ChartContainer)
const chartConfig = {
  previous: {
    label: "Previous FY",
    color: "var(--chart-1)",
  },
  current: {
    label: "Current FY",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type TaxKey = "gst" | "cbdt" | "telangana" | "assam" | "meghalaya"

const taxLabels: Record<TaxKey, string> = {
  gst: "GST",
  cbdt: "CBDT",
  telangana: "Telangana",
  assam: "Assam",
  meghalaya: "Meghalaya",
}

export function ChartBarMultipleTaxYearCompare() {
  const [activeTax, setActiveTax] = React.useState<TaxKey>("gst")

  const prevKey = `${activeTax}_prev` as keyof (typeof chartData)[number]
  const currKey = `${activeTax}_curr` as keyof (typeof chartData)[number]

  return (
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-1">
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex flex-col gap-1">
          <CardTitle>Month-wise Tax Comparison</CardTitle>
          <CardDescription>
            Previous FY vs Current FY for {taxLabels[activeTax]} (Jan – Jun)
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {(Object.keys(taxLabels) as TaxKey[]).map((tax) => (
            <button
              key={tax}
              type="button"
              data-active={activeTax === tax}
              onClick={() => setActiveTax(tax)}
              className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary rounded-md border px-3 py-1 text-xs font-medium"
            >
              {taxLabels[tax]}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  valueFormatter={(value) =>
                    `₹ ${Number(value || 0).toLocaleString()}`
                  }
                />
              }
            />
            <Bar
              dataKey={prevKey as string}
              name={chartConfig.previous.label}
              fill="var(--color-previous)"
              radius={4}
            />
            <Bar
              dataKey={currKey as string}
              name={chartConfig.current.label}
              fill="var(--color-current)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Comparing previous and current financial year month-wise for{" "}
          {taxLabels[activeTax]}
        </div>
      </CardFooter>
    </Card>
    // </div>
  )
}


export function BarChartMultipleTaxYearCompare() {
    return <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <ChartPieDonutTextTax />
        <ChartBarMultipleTaxYearCompare />
    </div>

}