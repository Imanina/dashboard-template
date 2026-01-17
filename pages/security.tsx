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

export default function SecurityPage() {
  return (
    <PageShell
      title="Security"
      subtitle="Protect customer data and enforce confidentiality"
      actions={
        <>
          <Button variant="outline">Audit Logs</Button>
          <Button>Update Policies</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Security Score</CardDescription>
            <CardTitle className="text-3xl">94%</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            All critical controls enabled
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Sessions</CardDescription>
            <CardTitle className="text-3xl">16</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Monitored in real time
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Access Violations</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Last 30 days
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Confidentiality Controls</CardTitle>
            <CardDescription>Policies and enforcement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Data classification enforced on customer records
            </div>
            <div className="rounded-md border px-3 py-2">
              Role-based access for sensitive applications
            </div>
            <div className="rounded-md border px-3 py-2">
              MFA required for approval actions
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Review Policies</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monitoring & Alerts</CardTitle>
            <CardDescription>Security events and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Real-time access log monitoring
            </div>
            <div className="rounded-md border px-3 py-2">
              Suspicious login detection enabled
            </div>
            <div className="rounded-md border px-3 py-2">
              Weekly audit report scheduled
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Configure Alerts</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

