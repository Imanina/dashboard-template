import { useAuth } from "../lib/auth-context"
import { PemohonView } from "../components/applications/PemohonView"
import { PegawaiOperasiView } from "../components/applications/PegawaiOperasiView"
import { SpsbView } from "../components/applications/SpsbView"
import { PengurusBesarView } from "../components/applications/PengurusBesarView"
import { KewanganView } from "../components/applications/KewanganView"
import { JkdmView } from "../components/applications/JkdmView"

export default function ApplicationsPage() {
  const { role } = useAuth()

  if (role === "Pemohon") return <PemohonView />
  if (role === "LPPS Pegawai Operasi") return <PegawaiOperasiView />
  if (role === "SPSB") return <SpsbView />
  if (role === "LPPS Pengurus Besar") return <PengurusBesarView />
  if (role === "LPPS Kewangan") return <KewanganView />
  if (role === "JKDM") return <JkdmView />

  return <PemohonView />
}

/* LEGACY VIEW BELOW

export default function ApplicationsPage() {
  const router = useRouter()
  const { role } = useAuth()
  const { applications, updateStatus } = useApplicationStore()
  const allowedSteps = ROLE_STEP_ACCESS.Pemohon || []

  const visibleApps = useMemo(
    () => applications.filter((app) => allowedSteps.includes(app.status)),
    [applications, allowedSteps]
  )

  if (role === "Pemohon") {
    return (
      <PageShell
        title="Applications"
        subtitle="Applications and permit payments"
        actions={
          <>
            <Button
              onClick={() => router.push("/applications/new")}
            >
              New Application
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/applications/renewal")}
            >
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

  if (role === "LPPS Pegawai Operasi") {
    const allowedStepsPo = ROLE_STEP_ACCESS["LPPS Pegawai Operasi"] || []
    const visibleAppsPo = applications.filter((app) => allowedStepsPo.includes(app.status))

    const handleCompleteStep = (id: string) => {
      const target = applications.find((app) => app.id === id)
      const nextStatus = target ? getNextStatus(target.status) : null
      updateStatus(id, nextStatus)
    }

    return (
      <PageShell title="Applications" subtitle="Document review and assessment">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {visibleAppsPo.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tasks for this step.</p>
            ) : (
              <div className="space-y-3">
                {visibleAppsPo.map((app) => (
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
                    <Button size="sm" onClick={() => handleCompleteStep(app.id)}>
                      Mark Complete
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

  if (role === "SPSB") {
    const allowedStepsSpsb = ROLE_STEP_ACCESS.SPSB || []
    const visibleAppsSpsb = applications.filter((app) => allowedStepsSpsb.includes(app.status))

    const handleVerify = (id: string) => {
      const target = applications.find((app) => app.id === id)
      const nextStatus = target ? getNextStatus(target.status) : null
      updateStatus(id, nextStatus)
    }

    return (
      <PageShell title="Applications" subtitle="Account status and outstanding verification">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SPSB Review</CardTitle>
          </CardHeader>
          <CardContent>
            {visibleAppsSpsb.length === 0 ? (
              <p className="text-sm text-muted-foreground">No new checks.</p>
            ) : (
              <div className="space-y-3">
                {visibleAppsSpsb.map((app) => (
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
                    <Button size="sm" onClick={() => handleVerify(app.id)}>
                      Confirm Check
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

  if (role === "LPPS Pengurus Besar") {
    const allowedStepsPb = ROLE_STEP_ACCESS["LPPS Pengurus Besar"] || []
    const visibleAppsPb = applications.filter((app) => allowedStepsPb.includes(app.status))

    const handleApprove = (id: string) => {
      const target = applications.find((app) => app.id === id)
      const nextStatus = target ? getNextStatus(target.status) : null
      updateStatus(id, nextStatus)
    }

    return (
      <PageShell title="Applications" subtitle="Approval by General Manager">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Approval</CardTitle>
          </CardHeader>
          <CardContent>
            {visibleAppsPb.length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications to review.</p>
            ) : (
              <div className="space-y-3">
                {visibleAppsPb.map((app) => (
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
                    <Button size="sm" onClick={() => handleApprove(app.id)}>
                      Approve
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

  if (role === "LPPS Kewangan") {
    const allowedStepsKw = ROLE_STEP_ACCESS["LPPS Kewangan"] || []
    const visibleAppsKw = applications.filter((app) => allowedStepsKw.includes(app.status))

    const handleConfirmPayment = (id: string) => {
      const target = applications.find((app) => app.id === id)
      const nextStatus = target ? getNextStatus(target.status) : null
      updateStatus(id, nextStatus)
    }

    return (
      <PageShell title="Applications" subtitle="Invoice and payment confirmation">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Invoice & Payment</CardTitle>
          </CardHeader>
          <CardContent>
            {visibleAppsKw.length === 0 ? (
              <p className="text-sm text-muted-foreground">No new invoices or payments.</p>
            ) : (
              <div className="space-y-3">
                {visibleAppsKw.map((app) => (
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
                    <Button size="sm" onClick={() => handleConfirmPayment(app.id)}>
                      Confirm Payment
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

  if (role === "JKDM") {
    const allowedStepsJkdm = ROLE_STEP_ACCESS.JKDM || []
    const visibleAppsJkdm = applications.filter((app) => allowedStepsJkdm.includes(app.status))

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
            {visibleAppsJkdm.length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications for final approval.</p>
            ) : (
              <div className="space-y-3">
                {visibleAppsJkdm.map((app) => (
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

  const pipeline = [
    { status: "Processing", count: 142, detail: "Initial review" },
    { status: "Payment", count: 68, detail: "Awaiting permit fees" },
    { status: "Validation", count: 44, detail: "Compliance checks" },
    { status: "Approval", count: 31, detail: "Final sign-off" },
    { status: "Permit Issued", count: 183, detail: "Ready for statements" },
  ]

  const recentApplications = [
    { id: "AP-2026-118", company: "Selat Marine", status: "Approval" },
    { id: "AP-2026-117", company: "East Coast LNG", status: "Validation" },
    { id: "AP-2026-116", company: "Penang Wharf Co.", status: "Payment" },
    { id: "AP-2026-115", company: "Borneo Industrial", status: "Processing" },
  ]

  return (
    <PageShell
      title="Applications"
      subtitle="Process, validate, and approve customer applications"
      actions={
        <>
          <Button variant="outline">Upload Documents</Button>
          <Button>Create Application</Button>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {pipeline.map((item) => (
          <Card key={item.status}>
            <CardHeader>
              <CardDescription>{item.status}</CardDescription>
              <CardTitle className="text-3xl">{item.count}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {item.detail}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
            <CardDescription>
              Track progress by status and assigned staff
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div>
                  <p className="font-medium">{app.id}</p>
                  <p className="text-xs text-muted-foreground">{app.company}</p>
                </div>
                <span className="text-xs rounded-full bg-muted px-2 py-1">
                  {app.status}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Applications</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Staff</CardTitle>
            <CardDescription>
              Processing, validation, and approval teams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Processing Officers</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Validation Team</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Approvers</span>
              <span className="font-medium">5</span>
            </div>
            <div className="rounded-md border bg-muted/30 p-3 text-xs">
              Staff IDs and permissions managed per workflow stage
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Assignments</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  )
}
*/
