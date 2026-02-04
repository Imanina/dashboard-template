import { useMemo } from "react"
import { useRouter } from "next/router"
import { PageShell } from "../PageShell"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getStepLabel, ROLE_STEP_ACCESS } from "../../lib/application-flow"
import { useApplicationStore } from "../../lib/application-store"

export function PemohonView() {
  const router = useRouter()
  const { applications } = useApplicationStore()
  const allowedSteps = ROLE_STEP_ACCESS.Pemohon || []

  const visibleApps = useMemo(
    () => applications.filter((app) => allowedSteps.includes(app.status)),
    [applications, allowedSteps]
  )

  return (
    <PageShell
      title="Applications"
      subtitle="Applications and permit payments"
      actions={
        <>
          <Button onClick={() => router.push("/applications/new")}>New Application</Button>
          <Button variant="outline" onClick={() => router.push("/applications/renewal")}>
            Renewal Application
          </Button>
        </>
      }
    >
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {visibleApps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No active applications for this role.
              </p>
            ) : (
              <div className="space-y-3">
                {visibleApps.map((app) => (
                  <div
                    key={app.id}
                    className="flex flex-col gap-1 rounded-md border p-3 text-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{app.companyName}</span>
                      <span className="text-xs text-muted-foreground">{app.id}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Applicant: {app.applicantName} • Date: {app.submittedAt}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Type: {app.applicationType || "New"}
                      {app.permitNumber ? ` • Permit: ${app.permitNumber}` : ""}
                    </div>
                    <div className="text-xs font-medium">
                      Status: {getStepLabel(app.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
