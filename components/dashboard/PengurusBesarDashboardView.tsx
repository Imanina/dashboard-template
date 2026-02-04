import { DashboardShell } from "./DashboardShell"
import { APPLICATION_PIPELINE, DASHBOARD_NOTIFICATIONS, SUMMARY_CARDS } from "./dashboardData"

export function PengurusBesarDashboardView() {
  return (
    <DashboardShell
      breadcrumbLabel="Pengurus Besar Dashboard"
      summaryCards={SUMMARY_CARDS}
      pipeline={APPLICATION_PIPELINE}
      notifications={DASHBOARD_NOTIFICATIONS}
    />
  )
}
