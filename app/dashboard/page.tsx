import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { SectionCards, SectionCards1, SectionCards2 } from "@/components/section-cards";
import { ChartBarLabelCustom } from "@/components/ui/mandate-summary";
import { TableDemo } from "@/components/ui/ui-tables";
import { ChartLineInteractive } from "@/components/ui/individual-tax-summary";
import { ChartPieDonutTextTax } from "@/components/ui/pie-chart";
import { BarChartMultipleTaxYearCompare, ChartBarMultipleTaxYearCompare } from "@/components/ui/bar-chart-multiple";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <SectionCards1 />
              <SectionCards2 />
              <TableDemo />
              <ChartLineInteractive />
              <BarChartMultipleTaxYearCompare />
              {/* <ChartBarMultipleTaxYearCompare /> */}
              {/* <ChartBarLabelCustom /> */}
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
