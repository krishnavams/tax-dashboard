import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSelector } from "./theme-selector";
import { ModeSwitcher } from "./mode-switcher";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-3 lg:px-6">
        <SidebarTrigger className="-ml-1 size-8" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />

        {/* Page title + context */}
        <div className="flex flex-col justify-center leading-none min-w-0">
          <span className="text-sm font-semibold truncate">
            Tax Collection Dashboard
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 hidden sm:block">
            IDFC FIRST Bank · FY 2024–25
          </span>
        </div>

        {/* Right-side controls */}
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeSelector />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
