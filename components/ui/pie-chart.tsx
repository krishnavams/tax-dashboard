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
import { ChartRadarVolumeFYWithDropdown } from "./radar"


export const description = "Tax distribution - donut chart with text"

// You can plug in your real tax values here
const chartData = [
  { category: "GST", value: 520, fill: "var(--color-gst)" },
  { category: "CBDT", value: 430, fill: "var(--color-cbdt)" },
  { category: "Telangana", value: 310, fill: "var(--color-telangana)" },
  { category: "Assam", value: 220, fill: "var(--color-assam)" },
  { category: "Meghalaya", value: 150, fill: "var(--color-meghalaya)" },
]

const chartConfig = {
  tax: {
    label: "Tax Amount",
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

export function ChartPieDonutTextTax() {
  const totalTax = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tax Distribution</CardTitle>
        <CardDescription>GST, CBDT and State-wise split</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  // optional: show "₹" in tooltip values
                  valueFormatter={(value) =>
                    `₹ ${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <Pie
              data={chartData}
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
                          className="fill-foreground text-2xl font-bold sm:text-3xl"
                        >
                          ₹ {totalTax.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs sm:text-sm"
                        >
                          Total Tax
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing overall tax share across GST, CBDT and selected states
        </div>
      </CardFooter>
    </Card>
    <ChartRadarVolumeFYWithDropdown />
    </div>
  )
}
