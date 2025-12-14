import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";
import { SectionCards, SectionCards1, SectionCards2 } from "@/components/section-cards";
import { TableDemo } from "@/components/ui/ui-tables";
import { ChartLineInteractive } from "@/components/ui/individual-tax-summary";
import { ChartBarMultipleTaxYearCompare } from "@/components/ui/bar-chart-multiple";
// import { ChartPieDonutTextTax } from "@/components/ui/pie-chart";
import { ChartPieDonutTextTaxWithRadar } from "@/components/pie-chart-all";
import MandatePaymentModeLineChart from "@/components/ui/mode-wise";
import MandateStatusAreaChart from "@/components/ui/mandate-all-status";
// import { MandateModeCollectionChart } from "@/components/ui/mode-wise";
// import MandateModeCollectionChart from "@/components/ui/mode-wise";

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
              {/* <SectionCards1 />
              <SectionCards2 /> */}
              {/* <TableDemo /> */}
              <ChartLineInteractive />
              <MandatePaymentModeLineChart />
              <ChartPieDonutTextTaxWithRadar />
              <ChartBarMultipleTaxYearCompare />
              <MandateStatusAreaChart />  
              {/* <BarChartMultipleTaxYearCompare /> */}
              {/* <ChartBarMultipleTaxYearCompare /> */}
              {/* <ChartBarLabelCustom /> */}
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
