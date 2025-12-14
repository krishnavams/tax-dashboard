import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Layers,
  TrendingUp,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="text-primary" />
            <span className="font-semibold tracking-wide">
              IDFC FIRST Bank
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            Tax Collection Analytics Platform
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Unified Tax Collection
            <span className="block text-primary mt-2">
              Monitoring & Analytics
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            An enterprise-grade analytics platform for monitoring tax
            collections across central and state mandates, payment channels,
            and transaction statuses — built to meet the operational and
            compliance needs of IDFC FIRST Bank.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <LayoutDashboard className="size-5" />
                Open Dashboard
              </Button>
            </Link>

            <Button size="lg" variant="outline">
              Platform Overview
            </Button>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold mb-10">
            Platform Capabilities
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Capability
              icon={<Layers />}
              title="Multi-Mandate Coverage"
              desc="GST, CBDT, Telangana, Assam, Meghalaya and other government mandates consolidated into a single platform."
            />

            <Capability
              icon={<BarChart3 />}
              title="Mode-wise Analytics"
              desc="Net Banking (Optimus, BXP), PG (UPI, Cards), OTC (Cash, Transfer, Clearing) with drill-down visibility."
            />

            <Capability
              icon={<TrendingUp />}
              title="Day-wise & Period Trends"
              desc="Track transaction trends across 7, 30 and 90 day windows for informed operational decisions."
            />

            <Capability
              icon={<ShieldCheck />}
              title="Transaction Status Control"
              desc="Monitor Success, Pending and Failed transactions to proactively manage risks and exceptions."
            />

            <Capability
              icon={<LayoutDashboard />}
              title="Executive & Ops Dashboards"
              desc="Clear dashboards designed for leadership, operations teams, and audit readiness."
            />

            <Capability
              icon={<Building2 />}
              title="Bank-Grade Architecture"
              desc="Secure, scalable, API-first design aligned with IDFC FIRST Bank’s enterprise standards."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold">
            Operational Visibility. Strategic Control.
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Enable teams across IDFC FIRST Bank to monitor tax collections,
            identify anomalies, and ensure smooth transaction processing
            across all mandates.
          </p>

          <Link href="/dashboard" className="inline-block mt-8">
            <Button size="lg" className="gap-2">
              <LayoutDashboard className="size-5" />
              Access Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} IDFC FIRST Bank · Internal Systems
      </footer>
    </div>
  );
}

/* ---------- Capability Card ---------- */

function Capability({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}
