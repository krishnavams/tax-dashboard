"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "Tax radar chart with lines only"

// Sample data – replace with your real tax values (maybe normalized / scaled)
const chartData = [
  { month: "January", gst: 220, cbdt: 180, telangana: 90, assam: 60, meghalaya: 40 },
  { month: "February", gst: 210, cbdt: 175, telangana: 100, assam: 70, meghalaya: 45 },
  { month: "March", gst: 240, cbdt: 190, telangana: 110, assam: 80, meghalaya: 50 },
  { month: "April", gst: 230, cbdt: 185, telangana: 105, assam: 75, meghalaya: 48 },
  { month: "May", gst: 250, cbdt: 200, telangana: 120, assam: 85, meghalaya: 55 },
  { month: "June", gst: 260, cbdt: 210, telangana: 130, assam: 90, meghalaya: 60 },
]

const chartConfig = {
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

export function ChartRadarLinesOnlyTax() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Tax Radar - Lines Only</CardTitle>
        <CardDescription>
          GST, CBDT and state-wise pattern (Jan – Jun 2024)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  valueFormatter={(value) =>
                    `₹ ${Number(value).toLocaleString()}`
                  }
                />
              }
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="gst"
              fill="var(--color-gst)"
              fillOpacity={0}
              stroke="var(--color-gst)"
              strokeWidth={2}
            />
            <Radar
              dataKey="cbdt"
              fill="var(--color-cbdt)"
              fillOpacity={0}
              stroke="var(--color-cbdt)"
              strokeWidth={2}
            />
            <Radar
              dataKey="telangana"
              fill="var(--color-telangana)"
              fillOpacity={0}
              stroke="var(--color-telangana)"
              strokeWidth={2}
            />
            <Radar
              dataKey="assam"
              fill="var(--color-assam)"
              fillOpacity={0}
              stroke="var(--color-assam)"
              strokeWidth={2}
            />
            <Radar
              dataKey="meghalaya"
              fill="var(--color-meghalaya)"
              fillOpacity={0}
              stroke="var(--color-meghalaya)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January – June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
