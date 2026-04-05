"use client";

import * as React from "react";
import {
  IconArrowsUpDown,
  IconChartBar,
  IconChartPie,
  IconCreditCard,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconHelp,
  IconListCheck,
  IconReport,
  IconSettings,
  IconBuildingBank,
  IconReceipt,
  IconTrendingUp,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin User",
    email: "admin@idfcfirstbank.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Tax Collections",
      url: "#",
      icon: IconReceipt,
    },
    {
      title: "Payment Modes",
      url: "#",
      icon: IconCreditCard,
    },
    {
      title: "Transaction Status",
      url: "#",
      icon: IconListCheck,
    },
    {
      title: "Year Comparison",
      url: "#",
      icon: IconArrowsUpDown,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "GST Data",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "CBDT Data",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "State Mandates",
      url: "#",
      icon: IconFileDescription,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconBuildingBank className="!size-5 text-primary" />
                <div className="leading-none">
                  <span className="text-sm font-semibold block">
                    IDFC FIRST Bank
                  </span>
                  <span className="text-[10px] text-sidebar-foreground/60 block mt-0.5">
                    Tax Analytics
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
