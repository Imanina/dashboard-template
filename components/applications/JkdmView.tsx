import { PageShell } from "../PageShell"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getNextStatus, getStepLabel, ROLE_STEP_ACCESS } from "../../lib/application-flow"
import { useApplicationStore } from "../../lib/application-store"

export function JkdmView() {
  const { applications, updateStatus } = useApplicationStore()
  const allowedSteps = ROLE_STEP_ACCESS.JKDM || []
  const visibleApps = applications.filter((app) => allowedSteps.includes(app.status))

  const handleFinalize = (id: string) => {
    const target = applications.find((app) => app.id === id)
    const nextStatus = target ? getNextStatus(target.status) : null
    updateStatus(id, nextStatus)
  }

  return (
    <PageShell title="Applications" subtitle="Final approval and compliance record">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Final Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {visibleApps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications for final approval.</p>
          ) : (
            <div className="space-y-3">
              {visibleApps.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col gap-2 rounded-md border p-3 text-sm md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-medium">{app.companyName}</div>
                    <div className="text-xs text-muted-foreground">
                      {app.id} • {getStepLabel(app.status)}
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleFinalize(app.id)}>
                    Finalize
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </PageShell>
  )
}
