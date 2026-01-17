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

export default function FinanceAlertsPage() {
  const alerts = [
    "Permit payment SLA breach for 9 applications",
    "Statement batch pending approval from Finance",
    "Internal transfer reconciliation due today",
  ];

  const reminders = [
    "Monthly revenue report due by 5 PM",
    "Outstanding refunds - RM 184k",
    "Quarterly audit checklist review",
  ];

  return (
    <PageShell
      title="Finance Alerts"
      subtitle="Alerts linked with Finance Department"
      actions={
        <>
          <Button variant="outline">Configure Alerts</Button>
          <Button>Notify Finance</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Open Alerts</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            4 critical, 8 informational
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending Statements</CardDescription>
            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Awaiting finance sign-off
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Payment Discrepancies</CardDescription>
            <CardTitle className="text-3xl">3</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Require reconciliation review
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Priority items from Finance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-md border px-3 py-2">
                {alert}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Alert Log</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Finance Reminders</CardTitle>
            <CardDescription>Scheduled and recurring checks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {reminders.map((item) => (
              <div key={item} className="rounded-md border px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Sync with Finance</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

