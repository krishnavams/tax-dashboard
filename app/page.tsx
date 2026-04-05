import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Layers,
  TrendingUp,
  Building2,
  ArrowRight,
  CheckCircle2,
  Activity,
  Zap,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HEADER ────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <Building2 className="size-4" />
            </div>
            <div className="leading-none">
              <p className="text-sm font-semibold">IDFC FIRST Bank</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Internal Operations</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            <a href="#capabilities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Capabilities
            </a>
            <a href="#mandates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Mandates
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground border rounded-full px-3 py-1.5">
              <Activity className="size-3 text-emerald-500" />
              FY 2024–25
            </span>
            <Link href="/dashboard">
              <Button size="sm" className="gap-1.5 h-8 text-xs px-3">
                <LayoutDashboard className="size-3.5" />
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6 gap-1.5 text-xs font-medium py-1 px-3">
            <Activity className="size-3 text-emerald-500" />
            Live Operations · FY 2024–25
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.1]">
            Unified Tax Collection
            <br />
            <span className="text-primary">Monitoring & Analytics</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Enterprise-grade analytics for monitoring tax collections across
            central and state mandates, payment channels, and transaction
            statuses — built for IDFC FIRST Bank&apos;s operational needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 h-11 px-6">
                <LayoutDashboard className="size-4" />
                Open Dashboard
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-11 px-6">
              Platform Overview
            </Button>
          </div>
        </div>

        {/* ── Key stats ── */}
        <div className="mt-14 flex flex-wrap gap-3">
          {[
            { value: "6", label: "Tax Mandates" },
            { value: "3", label: "Payment Channels" },
            { value: "9", label: "Sub-modes Tracked" },
            { value: "Real-time", label: "Data Refresh" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border bg-muted/30 px-4 py-3 min-w-[130px]"
            >
              <span className="text-xl font-bold leading-none tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground leading-tight max-w-[80px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* ── CAPABILITIES ──────────────────────────── */}
      <section id="capabilities" className="container mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Platform Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Everything you need to monitor tax operations
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            A complete view of collections, channels, and transaction health
            across all mandates and periods — from daily ops to annual reviews.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CapabilityCard
            icon={<Layers className="size-5" />}
            color="blue"
            title="Multi-Mandate Coverage"
            desc="GST, CBDT, Telangana, Assam, Meghalaya and ICEGATE consolidated into a single platform with unified reporting."
          />
          <CapabilityCard
            icon={<BarChart3 className="size-5" />}
            color="violet"
            title="Mode-wise Analytics"
            desc="Net Banking (Optimus, BXP), PG (UPI, Cards), and OTC (Cash, Transfer, Clearing) with full drill-down visibility."
          />
          <CapabilityCard
            icon={<TrendingUp className="size-5" />}
            color="emerald"
            title="Period Trend Analysis"
            desc="Track trends across 7, 30 and 90 day windows plus monthly, quarterly, half-yearly and annual views."
          />
          <CapabilityCard
            icon={<ShieldCheck className="size-5" />}
            color="amber"
            title="Transaction Status Control"
            desc="Monitor Success, Pending and Failed transactions day-wise to proactively manage risks and exceptions."
          />
          <CapabilityCard
            icon={<LayoutDashboard className="size-5" />}
            color="rose"
            title="Executive Dashboards"
            desc="Tailored views designed for leadership, operations teams, and audit readiness with clear KPI cards."
          />
          <CapabilityCard
            icon={<Building2 className="size-5" />}
            color="orange"
            title="Bank-Grade Architecture"
            desc="Secure, scalable, API-first design aligned with IDFC FIRST Bank's enterprise security standards."
          />
        </div>
      </section>

      {/* ── MANDATE LIST ──────────────────────────── */}
      <section id="mandates" className="bg-muted/30 border-t border-b">
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Covered Tax Mandates
          </p>
          <h2 className="text-xl font-semibold mb-8">
            All major central and state tax mandates in one place
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "GST",
              "CBDT",
              "Telangana CT",
              "Assam CT",
              "Meghalaya CT",
              "ICEGATE",
            ].map((mandate) => (
              <div
                key={mandate}
                className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium shadow-xs"
              >
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                {mandate}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-2xl border bg-muted/20 px-8 py-16 text-center">
          <Badge variant="outline" className="mb-6 gap-1.5 text-xs py-1 px-3">
            <Zap className="size-3 text-amber-500" />
            Ready to use
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Operational Visibility. Strategic Control.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Enable teams across IDFC FIRST Bank to monitor tax collections,
            identify anomalies, and ensure smooth transaction processing
            across all mandates.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 h-11 px-6">
                <LayoutDashboard className="size-4" />
                Access Dashboard
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────── */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground shrink-0">
              <Building2 className="size-3" />
            </div>
            <span className="text-sm text-muted-foreground">IDFC FIRST Bank</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-sm text-muted-foreground">Internal Systems</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} IDFC FIRST Bank. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Capability Card ─────────────────────────── */

const colorVariants = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
} as const;

function CapabilityCard({
  icon,
  color,
  title,
  desc,
}: {
  icon: React.ReactNode;
  color: keyof typeof colorVariants;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-xl border bg-background p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colorVariants[color]}`}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold mb-2 leading-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
