import { useRouter } from "next/router"
import { PageShell } from "../../components/PageShell"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function PemohonPage() {
  const router = useRouter()

  return (
    <PageShell title="Pemohon" subtitle="Applications and permit payments">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applications Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            All applicant applications are now in the Applications page.
          </p>
          <Button onClick={() => router.push("/applications")}>
            Go to Applications
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
