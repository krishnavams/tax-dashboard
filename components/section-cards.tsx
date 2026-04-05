import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface TaxCardValues {
  title: string;
  value: string;
  change: string;
  trendText: string;
  percentageIndicator: string;
  isPositive?: boolean;
}

export function StatCard({ title, value, change, trendText, percentageIndicator, isPositive }: TaxCardValues) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-bold tabular-nums tracking-tight @[250px]/card:text-4xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge
            variant="outline"
            className={
              isPositive
                ? "gap-1 text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900"
                : "gap-1 text-red-700 border-red-200 bg-red-50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900"
            }
          >
            {isPositive
              ? <IconTrendingUp className="size-3" />
              : <IconTrendingDown className="size-3" />
            }
            {percentageIndicator}%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div
          className={`line-clamp-1 flex items-center gap-1.5 font-medium text-sm ${
            isPositive
              ? "text-emerald-700 dark:text-emerald-400"
              : "text-red-700 dark:text-red-400"
          }`}
        >
          {change}
          {isPositive
            ? <IconTrendingUp className="size-3.5 shrink-0" />
            : <IconTrendingDown className="size-3.5 shrink-0" />
          }
        </div>
        <div className="text-xs text-muted-foreground">
          {trendText}
        </div>
      </CardFooter>
    </Card>
  )
}

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="Total Tax Amount"  value="₹322,594"  change="Trending up this month"        trendText="Compared to last 6 months"          percentageIndicator="22.5" isPositive={true} />
      <StatCard title="Total Tax Volume"  value="3,058"     change="Down 20% this period"          trendText="Acquisition needs attention"       percentageIndicator="20.0" isPositive={false} />
      <StatCard title="Commission"        value="₹1,12,250" change="Strong retention this quarter"  trendText="Engagement exceeds targets"         percentageIndicator="18.3" isPositive={true} />
      <StatCard title="Growth Rate"       value="22.5%"     change="Steady performance increase"   trendText="Meets growth projections"           percentageIndicator="22.5" isPositive={true} />
    </div>
  )
}

export function SectionCards1() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="FY25 Tax Amount"  value="₹222,594"  change="Trending up this month"   trendText="Compared to last 6 months"    percentageIndicator="20.5" isPositive={true} />
      <StatCard title="FY25 Tax Volume"  value="2,075"     change="Down 20% this period"     trendText="Acquisition needs attention"  percentageIndicator="20.0" isPositive={false} />
      <StatCard title="Commission"       value="₹91,250"   change="Strong user retention"    trendText="Engagement exceeds targets"   percentageIndicator="20.5" isPositive={true} />
      <StatCard title="Growth Rate"      value="20.5%"     change="Steady performance"       trendText="Meets growth projections"     percentageIndicator="20.5" isPositive={true} />
    </div>
  )
}

export function SectionCards2() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="FY26 Tax Amount"  value="₹0"   change="—" trendText="No data available yet" percentageIndicator="0" isPositive={true} />
      <StatCard title="FY26 Tax Volume"  value="0"    change="—" trendText="No data available yet" percentageIndicator="0" isPositive={true} />
      <StatCard title="Commission"       value="₹0"   change="—" trendText="No data available yet" percentageIndicator="0" isPositive={true} />
      <StatCard title="Growth Rate"      value="0%"   change="—" trendText="No data available yet" percentageIndicator="0" isPositive={true} />
    </div>
  )
}
