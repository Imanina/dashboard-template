import { DashboardShell } from "./DashboardShell"
import { APPLICATION_PIPELINE, DASHBOARD_NOTIFICATIONS, SUMMARY_CARDS } from "./dashboardData"

export function PegawaiOperasiDashboardView() {
  return (
    <DashboardShell
      breadcrumbLabel="Pegawai Operasi Dashboard"
      summaryCards={SUMMARY_CARDS}
      pipeline={APPLICATION_PIPELINE}
      notifications={DASHBOARD_NOTIFICATIONS}
    />
  )
}
