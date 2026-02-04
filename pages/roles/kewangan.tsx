import { useRouter } from "next/router"
import { PageShell } from "../../components/PageShell"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function KewanganPage() {
  const router = useRouter()

  return (
    <PageShell title="LPPS Kewangan" subtitle="Invoice and payment confirmation">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applications Link</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All invoices and payments are now in the Applications page.
          </p>
          <Button onClick={() => router.push("/applications")}>
            Go to Applications
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
