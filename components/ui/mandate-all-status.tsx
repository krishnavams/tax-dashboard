"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- TYPES ---------------- */

type DayPoint = {
  date: string;
  success: number;
  pending: number;
  failed: number;
};

type SubModeData = Record<string, DayPoint[]>;

type ChannelData = {
  netBanking: SubModeData;
  pg: SubModeData;
  otc: SubModeData;
};

type MandateData = Record<string, ChannelData>;

/* ---------------- MOCK DATA (SAMPLE) ---------------- */
/* Replace this with API response later */

const DATA: MandateData = {
  GST: {
    netBanking: {
      Optimus: generateDays(),
      BXP: generateDays(),
    },
    pg: {
      "Credit Card": generateDays(),
      "Debit Card": generateDays(),
      UPI: generateDays(),
    },
    otc: {
      Cash: generateDays(),
      Transfer: generateDays(),
      Clearing: generateDays(),
    },
  },
  CBDT: {
    netBanking: { Optimus: generateDays(), BXP: generateDays() },
    pg: { "Credit Card": generateDays(), "Debit Card": generateDays(), UPI: generateDays() },
    otc: { Cash: generateDays(), Transfer: generateDays(), Clearing: generateDays() },
  },
  Telangana: {
    netBanking: { Optimus: generateDays(), BXP: generateDays() },
    pg: { "Credit Card": generateDays(), "Debit Card": generateDays(), UPI: generateDays() },
    otc: { Cash: generateDays(), Transfer: generateDays(), Clearing: generateDays() },
  },
  Assam: {
    netBanking: { Optimus: generateDays(), BXP: generateDays() },
    pg: { "Credit Card": generateDays(), "Debit Card": generateDays(), UPI: generateDays() },
    otc: { Cash: generateDays(), Transfer: generateDays(), Clearing: generateDays() },
  },
  Meghalaya: {
    netBanking: { Optimus: generateDays(), BXP: generateDays() },
    pg: { "Credit Card": generateDays(), "Debit Card": generateDays(), UPI: generateDays() },
    otc: { Cash: generateDays(), Transfer: generateDays(), Clearing: generateDays() },
  },
};

/* ---------------- HELPERS ---------------- */

function generateDays(): DayPoint[] {
  const days: DayPoint[] = [];
  for (let i = 1; i <= 30; i++) {
    days.push({
      date: `2025-12-${String(i).padStart(2, "0")}`,
      success: Math.floor(Math.random() * 400) + 100,
      pending: Math.floor(Math.random() * 150) + 30,
      failed: Math.floor(Math.random() * 80) + 10,
    });
  }
  return days;
}

/* ---------------- CHART CONFIG ---------------- */

const chartConfig = {
  success: { label: "Success", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  failed: { label: "Failed", color: "var(--chart-3)" },
} satisfies ChartConfig;

/* ---------------- MAIN COMPONENT ---------------- */

export default function MandateStatusAreaChart() {
  const [mandate, setMandate] = React.useState("GST");
  const [channel, setChannel] =
    React.useState<"netBanking" | "pg" | "otc">("netBanking");
  const [subMode, setSubMode] = React.useState("Optimus");
  const [range, setRange] = React.useState("30d");

  const subModes = Object.keys(DATA[mandate][channel]);

  React.useEffect(() => {
    setSubMode(subModes[0]);
  }, [mandate, channel]);

  const rawData = DATA[mandate]?.[channel]?.[subMode] ?? [];

  const filteredData = rawData.slice(
    range === "7d" ? -7 : range === "30d" ? -30 : rawData.length
  );

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-1">    <Card>
      <CardHeader>
        <CardTitle>Transaction Status – Day Wise</CardTitle>
        <CardDescription>
          {mandate} | {channel.toUpperCase()} | {subMode}
        </CardDescription>

        <div className="flex flex-wrap gap-3 mt-3">
          <Select value={mandate} onValueChange={setMandate}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Mandate" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(DATA).map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={channel} onValueChange={(v) => setChannel(v as any)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="netBanking">Net Banking</SelectItem>
              <SelectItem value="pg">PG</SelectItem>
              <SelectItem value="otc">OTC</SelectItem>
            </SelectContent>
          </Select>

          <Select value={subMode} onValueChange={setSubMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sub Mode" />
            </SelectTrigger>
            <SelectContent>
              {subModes.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              {["success", "pending", "failed"].map((k) => (
                <linearGradient key={k} id={`fill-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`var(--color-${k})`} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={`var(--color-${k})`} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              interval={0}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              dataKey="failed"
              stackId="a"
              stroke="var(--color-failed)"
              fill="url(#fill-failed)"
            />
            <Area
              dataKey="pending"
              stackId="a"
              stroke="var(--color-pending)"
              fill="url(#fill-pending)"
            />
            <Area
              dataKey="success"
              stackId="a"
              stroke="var(--color-success)"
              fill="url(#fill-success)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>
  );
}
