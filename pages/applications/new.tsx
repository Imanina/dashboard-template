import { useEffect, useRef, useState } from "react"
import { PageShell } from "../../components/PageShell"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { useApplicationStore } from "../../lib/application-store"
import { ApplicationRecord } from "../../lib/mock-applications"
import { useCompanyProfile } from "../../lib/use-company-profile"

export default function NewApplicationPage() {
  const { applications, addApplication } = useApplicationStore()
  const { profile } = useCompanyProfile()
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    jettyName: "",
    jettyArea: "",
    jettyCoordinates: "",
    jettyDistanceKm: "",
    applicantName: "",
    phoneNumber: "",
    faxNumber: "",
    email: "",
    cargoType: "",
    shippingAgent: "",
    officerName: "",
    officerPhone: "",
    annualCargo: "",
    hasSabahPortsAccount: "no",
  })
  const [category, setCategory] = useState<"Private Jetty" | "Mid-Stream">("Private Jetty")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!profile) return
    setForm((prev) => ({
      ...prev,
      companyName: prev.companyName || profile.companyName,
      companyAddress: prev.companyAddress || profile.companyAddress,
      applicantName: prev.applicantName || profile.contactFullName,
      phoneNumber: prev.phoneNumber || profile.phoneNumber,
      faxNumber: prev.faxNumber || profile.faxNumber,
      email: prev.email || profile.email,
      shippingAgent: prev.shippingAgent || profile.shippingAgent,
      officerName: prev.officerName || profile.officerName,
      officerPhone: prev.officerPhone || profile.officerPhone,
    }))
  }, [profile])

  const requiredDocuments = [
    "Profil Syarikat",
    "Gambar lokasi jeti (semasa) dan salinan gambar Google Map",
    "Dokumen Syarikat: Borang 8, 9, 13, 24, 44 dan 49 (Akta Syarikat 1965) atau Akta Syarikat 2016",
    "Salinan kad pengenalan pemilik/pengurus syarikat",
    "Surat Permohonan Rasmi Syarikat",
    "Lesen Berniaga (Semasa)",
    "Salinan Geran Tanah / Temporary Occupational License (TOL) / Perjanjian Sewaan atau Pajakan",
    "Surat Tiada Halangan daripada Jabatan Pelabuhan dan Dermaga Sabah yang sah",
    "Surat Tiada Halangan daripada Jabatan Laut Malaysia Wilayah Sabah yang sah",
    "Surat Kelulusan / Tiada Halangan / Sokongan daripada Jabatan/Agensi berkaitan (jika perlu)",
  ]

  const handleSubmit = () => {
    const nextId = `APP-POC-${String(applications.length + 1).padStart(3, "0")}`
    const details = {
      ...form,
      category,
      requiredDocuments,
    }
    const newApp: ApplicationRecord = {
      id: nextId,
      applicantName: form.applicantName || "Pemohon Demo",
      companyName: form.companyName || "LPPS Demo Sdn Bhd",
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "submitted",
      applicationType: `${category} - New`,
      details,
      documents: uploadedFiles.map((file) => file.name),
    }
    void addApplication(newApp)
    setForm({
      companyName: "",
      companyAddress: "",
      jettyName: "",
      jettyArea: "",
      jettyCoordinates: "",
      jettyDistanceKm: "",
      applicantName: "",
      phoneNumber: "",
      faxNumber: "",
      email: "",
      cargoType: "",
      shippingAgent: "",
      officerName: "",
      officerPhone: "",
      annualCargo: "",
      hasSabahPortsAccount: "no",
    })
    setUploadedFiles([])
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    setUploadedFiles(files)
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
              Application Type
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                className={
                  category === "Private Jetty"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "hover:bg-slate-900 hover:text-white"
                }
                onClick={() => setCategory("Private Jetty")}
              >
                Private Jetty
              </Button>
              <Button
                type="button"
                variant="outline"
                className={
                  category === "Mid-Stream"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "hover:bg-slate-900 hover:text-white"
                }
                onClick={() => setCategory("Mid-Stream")}
              >
                Mid-Stream
              </Button>
            </div>
          </div>
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
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Textarea
                  id="companyAddress"
                  value={form.companyAddress}
                  onChange={(e) => setForm((prev) => ({ ...prev, companyAddress: e.target.value }))}
                  placeholder="Full company address"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jettyName">Jetty Name (if any)</Label>
                <Input
                  id="jettyName"
                  value={form.jettyName}
                  onChange={(e) => setForm((prev) => ({ ...prev, jettyName: e.target.value }))}
                  placeholder="Jetty name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jettyArea">Jetty Area</Label>
                <Input
                  id="jettyArea"
                  value={form.jettyArea}
                  onChange={(e) => setForm((prev) => ({ ...prev, jettyArea: e.target.value }))}
                  placeholder="e.g. Sandakan"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jettyCoordinates">Latitude & Longitude</Label>
                <Input
                  id="jettyCoordinates"
                  value={form.jettyCoordinates}
                  onChange={(e) => setForm((prev) => ({ ...prev, jettyCoordinates: e.target.value }))}
                  placeholder="e.g. 5°59'20.4&quot;N 116°04'03.6&quot;E"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jettyDistanceKm">
                  Distance to nearest port (KM)
                </Label>
                <Input
                  id="jettyDistanceKm"
                  value={form.jettyDistanceKm}
                  onChange={(e) => setForm((prev) => ({ ...prev, jettyDistanceKm: e.target.value }))}
                  placeholder="e.g. 5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="applicantName">Full Name</Label>
                <Input
                  id="applicantName"
                  value={form.applicantName}
                  onChange={(e) => setForm((prev) => ({ ...prev, applicantName: e.target.value }))}
                  placeholder="Full name"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="e.g. 0132659874"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="faxNumber">Fax Number</Label>
                <Input
                  id="faxNumber"
                  value={form.faxNumber}
                  onChange={(e) => setForm((prev) => ({ ...prev, faxNumber: e.target.value }))}
                  placeholder="e.g. 088456998"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. name@email.com"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cargoType">Cargo Type (detailed)</Label>
                <Textarea
                  id="cargoType"
                  value={form.cargoType}
                  onChange={(e) => setForm((prev) => ({ ...prev, cargoType: e.target.value }))}
                  placeholder="e.g. batu, pasir, bahan binaan"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shippingAgent">Shipping Agent (if any)</Label>
                <Input
                  id="shippingAgent"
                  value={form.shippingAgent}
                  onChange={(e) => setForm((prev) => ({ ...prev, shippingAgent: e.target.value }))}
                  placeholder="e.g. Agent Shipping Sdn Bhd"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="officerName">Officer/Agent Name</Label>
                <Input
                  id="officerName"
                  value={form.officerName}
                  onChange={(e) => setForm((prev) => ({ ...prev, officerName: e.target.value }))}
                  placeholder="Officer/Agent name"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="officerPhone">Officer/Agent Phone</Label>
                <Input
                  id="officerPhone"
                  value={form.officerPhone}
                  onChange={(e) => setForm((prev) => ({ ...prev, officerPhone: e.target.value }))}
                  placeholder="Officer/Agent phone number"
                  readOnly={Boolean(profile)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="annualCargo">Annual Cargo (Metric Ton)</Label>
                <Input
                  id="annualCargo"
                  value={form.annualCargo}
                  onChange={(e) => setForm((prev) => ({ ...prev, annualCargo: e.target.value }))}
                  placeholder="e.g. 500"
                />
              </div>
              <div className="grid gap-2">
                <Label>Sabah Ports Account</Label>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sabahPortsAccount"
                      checked={form.hasSabahPortsAccount === "yes"}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, hasSabahPortsAccount: "yes" }))
                      }
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sabahPortsAccount"
                      checked={form.hasSabahPortsAccount === "no"}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, hasSabahPortsAccount: "no" }))
                      }
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md border border-dashed p-4">
            <div className="mb-3 text-sm font-semibold text-muted-foreground">
              Required Documents (upload PDFs)
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {requiredDocuments.map((doc) => (
                <li key={doc}>{doc}</li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Documents
              </Button>
              {uploadedFiles.length > 0 ? (
                <div className="rounded-md border border-dashed p-3 text-sm">
                  <div className="mb-2 font-medium text-muted-foreground">
                    Selected files
                  </div>
                  <ul className="list-disc space-y-1 pl-5">
                    {uploadedFiles.map((file) => (
                      <li key={`${file.name}-${file.size}`}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div className="space-y-2 pt-1">
            <Button className="w-full" variant="outline" onClick={handleSubmit}>
              Submit Application
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
