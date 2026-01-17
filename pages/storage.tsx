import { PageShell } from "../components/PageShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function StoragePage() {
  return (
    <PageShell
      title="Storage"
      subtitle="Large attachments for applications and permits"
      actions={
        <>
          <Button variant="outline">Retention Policy</Button>
          <Button>Manage Storage</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Storage Usage</CardDescription>
            <CardTitle className="text-3xl">72 TB</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            68% of allocated capacity
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Retention Policy</CardDescription>
            <CardTitle className="text-3xl">10 Years</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Regulatory compliance enabled
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Uploads</CardDescription>
            <CardTitle className="text-3xl">48</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Large attachments in progress
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attachment Queue</CardTitle>
            <CardDescription>
              Recent application files awaiting review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              AP-2026-118 - Jetty Layout Plan.pdf
            </div>
            <div className="rounded-md border px-3 py-2">
              AP-2026-114 - Safety Certificate.zip
            </div>
            <div className="rounded-md border px-3 py-2">
              AP-2026-109 - Environmental Report.pdf
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Review Files</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security & Encryption</CardTitle>
            <CardDescription>Confidential attachments protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Encryption at rest and in transit
            </div>
            <div className="rounded-md border px-3 py-2">
              Access logging enabled
            </div>
            <div className="rounded-md border px-3 py-2">
              Disaster recovery backups enabled
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Storage Logs</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

