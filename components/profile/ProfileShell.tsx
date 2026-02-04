import { useEffect, useState } from "react"
import { PageShell } from "../PageShell"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useAuth } from "../../lib/auth-context"

const PROFILE_STORAGE_KEY = "pocProfile"

interface ProfileFormState {
  fullName: string
  phone: string
  department: string
  bio: string
}

interface ProfileShellProps {
  title: string
  subtitle: string
}

export function ProfileShell({ title, subtitle }: ProfileShellProps) {
  const { user, role } = useAuth()
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<ProfileFormState>({
    fullName: "",
    phone: "",
    department: "",
    bio: "",
  })

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(PROFILE_STORAGE_KEY) : null
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ProfileFormState
        setForm(parsed)
        return
      } catch {
        // ignore invalid local data
      }
    }
    setForm({
      fullName: user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User",
      phone: "",
      department: role || "",
      bio: "",
    })
  }, [user, role])

  const handleChange = (field: keyof ProfileFormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(form))
    }
    setSaved(true)
  }

  return (
    <PageShell title={title} subtitle={subtitle}>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-base">User Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="Nama penuh"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email || ""} disabled />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="Nombor telefon"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department / Role</Label>
              <Input
                id="department"
                value={form.department}
                onChange={handleChange("department")}
                placeholder="Department"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Notes</Label>
            <Textarea
              id="bio"
              value={form.bio}
              onChange={handleChange("bio")}
              placeholder="Additional info"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSave}>Simpan</Button>
            {saved ? <span className="text-sm text-muted-foreground">Saved.</span> : null}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
