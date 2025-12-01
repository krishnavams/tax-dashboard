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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description =
  "Tax volume radar chart for the current financial year (with selector & All option)"

// 📊 Replace with your real volume data (Apr–Mar)
const chartData = [
  { month: "Apr", gst: 2200, cbdt: 1800, telangana: 900, assam: 600, meghalaya: 400 },
  { month: "May", gst: 2400, cbdt: 1900, telangana: 950, assam: 650, meghalaya: 420 },
  { month: "Jun", gst: 2500, cbdt: 2000, telangana: 1000, assam: 700, meghalaya: 450 },
  { month: "Jul", gst: 2600, cbdt: 2050, telangana: 1050, assam: 730, meghalaya: 470 },
  { month: "Aug", gst: 2700, cbdt: 2100, telangana: 1100, assam: 760, meghalaya: 490 },
  { month: "Sep", gst: 2800, cbdt: 2200, telangana: 1150, assam: 800, meghalaya: 510 },
  { month: "Oct", gst: 3000, cbdt: 2300, telangana: 1200, assam: 830, meghalaya: 530 },
  { month: "Nov", gst: 3100, cbdt: 2400, telangana: 1250, assam: 860, meghalaya: 550 },
  { month: "Dec", gst: 3200, cbdt: 2450, telangana: 1300, assam: 890, meghalaya: 570 },
  { month: "Jan", gst: 3300, cbdt: 2500, telangana: 1350, assam: 920, meghalaya: 590 },
  { month: "Feb", gst: 3400, cbdt: 2550, telangana: 1400, assam: 950, meghalaya: 610 },
  { month: "Mar", gst: 3600, cbdt: 2700, telangana: 1500, assam: 1000, meghalaya: 650 },
]

const chartConfig = {
  gst: { label: "GST", color: "var(--chart-1)" },
  cbdt: { label: "CBDT", color: "var(--chart-2)" },
  telangana: { label: "Telangana", color: "var(--chart-3)" },
  assam: { label: "Assam", color: "var(--chart-4)" },
  meghalaya: { label: "Meghalaya", color: "var(--chart-5)" },
} satisfies ChartConfig

type TaxKey = keyof typeof chartConfig
type SelectKey = TaxKey | "all"

export function ChartRadarVolumeFYWithDropdown() {
  const [selectedTax, setSelectedTax] = React.useState<SelectKey>("gst")

  return (
    <Card>
      <CardHeader className="items-center pb-4 space-y-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <CardTitle>FY Tax Volume Radar</CardTitle>
          <CardDescription>
            GST, CBDT & state-wise volume pattern (Apr – Mar, Current FY)
          </CardDescription>
        </div>

        {/* ✅ shadcn Dropdown with ALL option */}
        <Select
          value={selectedTax}
          onValueChange={(v) => setSelectedTax(v as SelectKey)}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select Tax Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All (Central & States)</SelectItem>
            <SelectItem value="gst">GST (Central)</SelectItem>
            <SelectItem value="cbdt">CBDT (Central)</SelectItem>
            <SelectItem value="telangana">Telangana (State)</SelectItem>
            <SelectItem value="assam">Assam (State)</SelectItem>
            <SelectItem value="meghalaya">Meghalaya (State)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  valueFormatter={(value) =>
                    `${Number(value).toLocaleString()} txns`
                  }
                />
              }
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />

            {/* ✅ If ALL selected, render all lines */}
            {selectedTax === "all" ? (
              <>
                <Radar dataKey="gst" fill="var(--color-gst)" fillOpacity={0} stroke="var(--color-gst)" strokeWidth={2} />
                <Radar dataKey="cbdt" fill="var(--color-cbdt)" fillOpacity={0} stroke="var(--color-cbdt)" strokeWidth={2} />
                <Radar dataKey="telangana" fill="var(--color-telangana)" fillOpacity={0} stroke="var(--color-telangana)" strokeWidth={2} />
                <Radar dataKey="assam" fill="var(--color-assam)" fillOpacity={0} stroke="var(--color-assam)" strokeWidth={2} />
                <Radar dataKey="meghalaya" fill="var(--color-meghalaya)" fillOpacity={0} stroke="var(--color-meghalaya)" strokeWidth={2} />
              </>
            ) : (
              <Radar
                dataKey={selectedTax}
                fill={`var(--color-${selectedTax})`}
                fillOpacity={0}
                stroke={`var(--color-${selectedTax})`}
                strokeWidth={3}
              />
            )}
          </RadarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Volume trending upward this FY <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {selectedTax === "all"
            ? "Showing combined GST, CBDT & state-wise volumes"
            : `Showing FY volume for ${chartConfig[selectedTax].label}`}
        </div>
      </CardFooter>
    </Card>
  )
}
