import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SectionCards } from "@/components/section-cards";
import { ChartLineInteractive } from "@/components/ui/individual-tax-summary";
import { ChartBarMultipleTaxYearCompare } from "@/components/ui/bar-chart-multiple";
import { ChartPieDonutTextTaxWithRadar } from "@/components/pie-chart-all";
import MandatePaymentModeLineChart from "@/components/ui/mode-wise";
import MandateStatusAreaChart from "@/components/ui/mandate-all-status";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col gap-8 py-6 md:py-8">

              {/* ── KPI Metrics ─────────────────────────── */}
              <section>
                <div className="px-4 lg:px-6 mb-4">
                  <h2 className="text-sm font-semibold text-foreground">Key Metrics</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Overall tax collection performance for the current period
                  </p>
                </div>
                <SectionCards />
              </section>

              {/* ── Collection Trends ───────────────────── */}
              <section className="flex flex-col gap-5 px-4 lg:px-6">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Collection Trends</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Day-wise tax collection analysis by mandate and payment mode
                  </p>
                </div>
                <ChartLineInteractive />
                <MandatePaymentModeLineChart />
              </section>

              {/* ── Tax Distribution ────────────────────── */}
              <section className="flex flex-col gap-5 px-4 lg:px-6">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Tax Distribution</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Period-wise and mandate-wise tax value breakdown
                  </p>
                </div>
                <ChartPieDonutTextTaxWithRadar />
              </section>

              {/* ── Year-over-Year Comparison ────────────── */}
              <section className="flex flex-col gap-5 px-4 lg:px-6">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Year-over-Year Comparison</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    FY 2024–25 vs FY 2023–24 mandate-wise performance
                  </p>
                </div>
                <ChartBarMultipleTaxYearCompare />
              </section>

              {/* ── Transaction Status ───────────────────── */}
              <section className="flex flex-col gap-5 px-4 lg:px-6 pb-8">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Transaction Status</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Day-wise success, pending and failed transaction tracking
                  </p>
                </div>
                <MandateStatusAreaChart />
              </section>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
