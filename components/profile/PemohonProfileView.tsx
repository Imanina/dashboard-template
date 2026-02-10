import { useEffect, useState } from "react"
import { PageShell } from "../PageShell"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { supabase } from "../../lib/supabase"
import { useCompanyProfile } from "../../lib/use-company-profile"

interface CompanyProfileForm {
  companyName: string
  companyAddress: string
  contactFullName: string
  phoneNumber: string
  faxNumber: string
  email: string
  shippingAgent: string
  officerName: string
  officerPhone: string
}

export function PemohonProfileView() {
  const { profile } = useCompanyProfile()
  const profileId = profile?.id ?? "00000000-0000-0000-0000-000000000001"
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<CompanyProfileForm>({
    companyName: "",
    companyAddress: "",
    contactFullName: "",
    phoneNumber: "",
    faxNumber: "",
    email: "",
    shippingAgent: "",
    officerName: "",
    officerPhone: "",
  })

  useEffect(() => {
    if (!profile) return
    setForm({
      companyName: profile.companyName,
      companyAddress: profile.companyAddress,
      contactFullName: profile.contactFullName,
      phoneNumber: profile.phoneNumber,
      faxNumber: profile.faxNumber,
      email: profile.email,
      shippingAgent: profile.shippingAgent,
      officerName: profile.officerName,
      officerPhone: profile.officerPhone,
    })
  }, [profile])

  const handleChange = (field: keyof CompanyProfileForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    const payload = {
      id: profileId,
      company_name: form.companyName,
      company_address: form.companyAddress,
      contact_full_name: form.contactFullName,
      phone_number: form.phoneNumber,
      fax_number: form.faxNumber,
      email: form.email,
      shipping_agent: form.shippingAgent,
      officer_name: form.officerName,
      officer_phone: form.officerPhone,
    }

    const { error } = await supabase
      .schema("LPPS")
      .from("company_profiles")
      .upsert(payload, { onConflict: "id" })

    setSaving(false)

    if (error) {
      console.error("Failed to save company profile:", error)
      return
    }

    setSaved(true)
  }

  return (
    <PageShell title="Profile" subtitle="Update company profile details">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={form.companyName}
              onChange={handleChange("companyName")}
              placeholder="Company name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              value={form.companyAddress}
              onChange={handleChange("companyAddress")}
              placeholder="Full company address"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactFullName">Full Name (Contact)</Label>
            <Input
              id="contactFullName"
              value={form.contactFullName}
              onChange={handleChange("contactFullName")}
              placeholder="Full name"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
                placeholder="Phone number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="faxNumber">Fax Number</Label>
              <Input
                id="faxNumber"
                value={form.faxNumber}
                onChange={handleChange("faxNumber")}
                placeholder="Fax number"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="Email address"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shippingAgent">Shipping Agent (if any)</Label>
            <Input
              id="shippingAgent"
              value={form.shippingAgent}
              onChange={handleChange("shippingAgent")}
              placeholder="Agent Shipping Sdn Bhd"
            />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="officerName">Officer/Agent Name</Label>
              <Input
                id="officerName"
                value={form.officerName}
                onChange={handleChange("officerName")}
                placeholder="Officer/Agent name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="officerPhone">Officer/Agent Phone</Label>
              <Input
                id="officerPhone"
                value={form.officerPhone}
                onChange={handleChange("officerPhone")}
                placeholder="Officer/Agent phone number"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving} variant="outline">
              {saving ? "Saving..." : "Save"}
            </Button>
            {saved ? <span className="text-sm text-muted-foreground">Saved.</span> : null}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
