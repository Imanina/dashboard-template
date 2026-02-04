import { useState } from "react"
import { PageShell } from "../../components/PageShell"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useApplicationStore } from "../../lib/application-store"
import { ApplicationRecord } from "../../lib/mock-applications"

export default function RenewalApplicationPage() {
  const { applications, addApplication } = useApplicationStore()
  const [form, setForm] = useState({
    companyName: "",
    applicantName: "",
    permitNumber: "",
  })

  const handleSubmit = () => {
    const nextId = `APP-POC-${String(applications.length + 1).padStart(3, "0")}`
    const newApp: ApplicationRecord = {
      id: nextId,
      applicantName: form.applicantName || "Pemohon Demo",
      companyName: form.companyName || "LPPS Demo Sdn Bhd",
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "submitted",
      applicationType: "Renewal",
      permitNumber: form.permitNumber || "PERMIT-000",
    }
    addApplication(newApp)
    setForm({ companyName: "", applicantName: "", permitNumber: "" })
  }

  return (
    <PageShell title="Renewal Application" subtitle="Submit a permit renewal request">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">Renewal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={form.companyName}
              onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
              placeholder="Company name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="applicantName">Applicant Name</Label>
            <Input
              id="applicantName"
              value={form.applicantName}
              onChange={(e) => setForm((prev) => ({ ...prev, applicantName: e.target.value }))}
              placeholder="Applicant name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="permitNumber">Previous Permit Number</Label>
            <Input
              id="permitNumber"
              value={form.permitNumber}
              onChange={(e) => setForm((prev) => ({ ...prev, permitNumber: e.target.value }))}
              placeholder="Permit number"
            />
          </div>
          <div className="space-y-2 pt-1">
            <Button className="w-full" onClick={handleSubmit}>
              Submit Renewal
            </Button>
            <Button className="w-full" variant="outline">
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
