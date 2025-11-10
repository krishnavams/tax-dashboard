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

export function StatCard({title, value, change, trendText, percentageIndicator, isPositive}:TaxCardValues){
  return (
  <>
  <Card className="@container/card">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {isPositive ? (<IconTrendingUp />) : (<IconTrendingDown />)}
              {percentageIndicator}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {change} 
            {isPositive ? (<IconTrendingUp className="size-4" />) : (<IconTrendingDown className="size-4"/>)}
          </div>
          <div className="text-muted-foreground">
            {trendText}
          </div>
        </CardFooter>
      </Card>
      </>)

}

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="Total Tax Amount" value="₹322,594" change="Trending up this month" trendText="Visitors for the last 6 months" percentageIndicator="22.5" isPositive={true}/>
      <StatCard title="Total Tax Volume" value="3058" change="Down 20% this period" trendText="Acquisition needs attention" percentageIndicator="22.5" isPositive={true}/>
      <StatCard title="Commission" value="₹1,12,250" change="Strong user retention" trendText="Engagement exceed targets" percentageIndicator="22.5" isPositive={true}/>
      <StatCard title="Growth Rate" value="22.5%" change="Steady performance increase" trendText="Meets growth projections" percentageIndicator="22.5" isPositive={true}/>
    </div>
  )
}

export function SectionCards1() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="FY25 Tax Amount" value="₹222,594" change="Trending up this month" trendText="Visitors for the last 6 months" percentageIndicator="20.5" isPositive={true}/>
      <StatCard title="FY25 Tax Volume" value="2075" change="Down 20% this period" trendText="Acquisition needs attention" percentageIndicator="20" isPositive={true}/>
      <StatCard title="Commission" value="₹91,250" change="Strong user retention" trendText="Engagement exceed targets" percentageIndicator="20.50" isPositive={true}/>
      <StatCard title="Growth Rate" value="20.5%" change="Steady performance increase" trendText="Meets growth projections" percentageIndicator="20.50" isPositive={true}/>
    </div>
  )
}

export function SectionCards2() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <StatCard title="FY26 Tax Amount" value="₹0" change="-" trendText="-" percentageIndicator="0" isPositive={true}/>
      <StatCard title="FY26 Tax Volume" value="0" change="-" trendText="-" percentageIndicator="0" isPositive={true}/>
      <StatCard title="Commission" value="₹0" change="-" trendText="-" percentageIndicator="0" isPositive={true}/>
      <StatCard title="Growth Rate" value="0%" change="-" trendText="-" percentageIndicator="0" isPositive={true}/>
    </div>
  )
}
