import { useState } from "react"
import { PageShell } from "../../components/PageShell"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useApplicationStore } from "../../lib/application-store"
import { ApplicationRecord } from "../../lib/mock-applications"

export default function NewApplicationPage() {
  const { applications, addApplication } = useApplicationStore()
  const [form, setForm] = useState({
    companyName: "",
    applicantName: "",
  })

  const handleSubmit = () => {
    const nextId = `APP-POC-${String(applications.length + 1).padStart(3, "0")}`
    const newApp: ApplicationRecord = {
      id: nextId,
      applicantName: form.applicantName || "Pemohon Demo",
      companyName: form.companyName || "LPPS Demo Sdn Bhd",
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "submitted",
      applicationType: "New",
    }
    addApplication(newApp)
    setForm({ companyName: "", applicantName: "" })
  }

  return (
    <PageShell title="New Application" subtitle="Submit a new permit application">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">Applicant Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border border-dashed p-4">
            <div className="mb-3 text-sm font-semibold text-muted-foreground">
              Applicant Information
            </div>
            <div className="grid gap-3">
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
            </div>
          </div>
          <div className="space-y-2 pt-1">
            <Button className="w-full" variant="outline" onClick={handleSubmit}>
              Submit Application
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
