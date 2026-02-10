import { DashboardShell } from "./DashboardShell"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import {
  Bell,
  FileText,
  FolderOpen,
  ListChecks,
  Sparkles,
  Wallet,
} from "lucide-react"

export function PemohonDashboardView() {
  const summaryCards = [
    {
      title: "My Applications",
      value: "5",
      caption: "Across all statuses",
      accent: "bg-blue-50 text-blue-600",
      icon: FileText,
    },
    {
      title: "Pending Actions",
      value: "2",
      caption: "Documents or payments needed",
      accent: "bg-amber-50 text-amber-600",
      icon: ListChecks,
    },
    {
      title: "Approved Permits",
      value: "1",
      caption: "Active approvals",
      accent: "bg-emerald-50 text-emerald-600",
      icon: Sparkles,
    },
    {
      title: "Drafts",
      value: "1",
      caption: "Continue where you left off",
      accent: "bg-purple-50 text-purple-600",
      icon: FolderOpen,
    },
  ]

  const applications = [
    {
      title: "Jetty Permit - Tanjung Bayu",
      status: "In Review",
      updated: "2 days ago",
      actionLabel: "View",
    },
    {
      title: "Jetty Renewal - Pesisir Utara",
      status: "Payment Required",
      updated: "Yesterday",
      actionLabel: "Pay Now",
    },
    {
      title: "Jetty Permit - Kuala Darat",
      status: "Draft",
      updated: "5 days ago",
      actionLabel: "Continue",
    },
  ]

  const requiredActions = [
    {
      title: "Upload site plan for AP-2026-118",
      detail: "Missing document in validation step",
    },
    {
      title: "Pay processing fee for AP-2026-104",
      detail: "Payment due within 5 days",
    },
  ]

  const activity = [
    "Application AP-2026-118 moved to Validation",
    "Payment received for AP-2026-101",
    "New message from LPPS Operations",
  ]

  return (
    <DashboardShell breadcrumbLabel="Pemohon Dashboard" headerActions={null}>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title} className="border-slate-200 bg-white">
              <CardHeader className="flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <CardDescription>{card.title}</CardDescription>
                  <CardTitle className="text-3xl">{card.value}</CardTitle>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold ${card.accent}`}
                >
                  <card.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{card.caption}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-slate-200 bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track your submissions and next steps</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.title}
                  className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">{app.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-white px-2 py-0.5 text-foreground shadow-sm">
                        {app.status}
                      </span>
                      <span className="text-muted-foreground">Updated {app.updated}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {app.actionLabel}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <ListChecks className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Required Actions</CardTitle>
                  <CardDescription>Complete these to avoid delays</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {requiredActions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-dashed border-amber-200 bg-amber-50/60 px-3 py-2"
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-slate-200 bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates on your applications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((note) => (
                <div
                  key={note}
                  className="rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-3 py-2 text-sm"
                >
                  {note}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle>Quick Links</CardTitle>
                  <CardDescription>Helpful shortcuts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" size="sm">
                Start New Application
              </Button>
              <Button variant="outline" size="sm">
                View Payments
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardShell>
  )
}
