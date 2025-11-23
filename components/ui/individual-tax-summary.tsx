"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Individual tax collections - interactive line chart"

// ✅ Change your data shape: one entry per day, with 5 series
const chartData = [
  { date: "2024-04-01", gst: 888, cbdt: 350, telangana: 220, assam: 140, meghalaya: 80 },
  { date: "2024-04-02", gst: 420, cbdt: 310, telangana: 180, assam: 90, meghalaya: 60 },
  { date: "2024-04-03", gst: 510, cbdt: 290, telangana: 200, assam: 110, meghalaya: 75 },
  { date: "2024-04-04", gst: 620, cbdt: 330, telangana: 240, assam: 130, meghalaya: 90 },
  { date: "2024-04-05", gst: 700, cbdt: 360, telangana: 260, assam: 150, meghalaya: 100 },
  // 👉 add more rows as needed with the same keys
]

// ✅ Config for each line (ChartContainer will create --color-* vars for these keys)
const chartConfig = {
  // meta key, not rendered as a line
  views: {
    label: "Tax Collections",
  },
  gst: {
    label: "GST",
    color: "var(--chart-1)",
  },
  cbdt: {
    label: "CBDT",
    color: "var(--chart-2)",
  },
  telangana: {
    label: "Telangana",
    color: "var(--chart-3)",
  },
  assam: {
    label: "Assam",
    color: "var(--chart-4)",
  },
  meghalaya: {
    label: "Meghalaya",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("gst")

  // ✅ Compute totals for each tax key
  const total = React.useMemo(
    () => ({
      gst: chartData.reduce((acc, curr) => acc + curr.gst, 0),
      cbdt: chartData.reduce((acc, curr) => acc + curr.cbdt, 0),
      telangana: chartData.reduce((acc, curr) => acc + curr.telangana, 0),
      assam: chartData.reduce((acc, curr) => acc + curr.assam, 0),
      meghalaya: chartData.reduce((acc, curr) => acc + curr.meghalaya, 0),
    }),
    []
  )

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1">
      <Card className="py-4 sm:py-0">
        <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
            <CardTitle>Individual Tax Summary - Interactive</CardTitle>
            <CardDescription>
              Showing total tax values for GST, CBDT and selected states
            </CardDescription>
          </div>
          <div className="flex flex-wrap">
            {(
              ["gst", "cbdt", "telangana", "assam", "meghalaya"] as Array<
                keyof typeof chartConfig
              >
            ).map((chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex min-w-[120px] flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-4"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-2xl">
                  {
                    // @ts-ignore – we know total has same keys
                    total[chart].toLocaleString()
                  }
                </span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[180px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
