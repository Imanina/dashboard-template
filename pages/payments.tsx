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

export default function PaymentsPage() {
  const financeAlerts = [
    "Permit payment SLA breach for 9 applications",
    "Internal transfer reconciliation due today",
    "Monthly statement batch scheduled",
  ];

  const permitTiers = [
    { tier: "0 - 5k MT", rate: "RM 1,200" },
    { tier: "5k - 20k MT", rate: "RM 4,800" },
    { tier: "20k+ MT", rate: "RM 9,500" },
  ];

  return (
    <PageShell
      title="Payments & Permits"
      subtitle="Set permit rates, monitor payments, and issue letters"
      actions={
        <>
          <Button variant="outline">Create Permit Tier</Button>
          <Button>Generate Letter</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Permit Setup by Tonnage</CardTitle>
            <CardDescription>
              Configure permit fees based on tonnage tiers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {permitTiers.map((tier) => (
              <div
                key={tier.tier}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span>{tier.tier}</span>
                <span className="font-medium">{tier.rate}</span>
              </div>
            ))}
            <div className="rounded-md border border-dashed px-3 py-2 text-xs text-muted-foreground">
              Custom letter templates for payment, approval, and permit issuance
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Edit Templates</Button>
            <Button>Save Permit Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Controls</CardTitle>
            <CardDescription>
              Incoming, outgoing, and internal payments (info only)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-md border px-3 py-2">
              Incoming payments: RM 8.4M
            </div>
            <div className="rounded-md border px-3 py-2">
              Outgoing payments: RM 2.1M
            </div>
            <div className="rounded-md border px-3 py-2">
              Internal transfers: RM 1.9M
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Payment Log</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Finance Alerts</CardTitle>
            <CardDescription>
              Linked with Finance Department for escalations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {financeAlerts.map((alert) => (
              <div key={alert} className="rounded-md border px-3 py-2">
                {alert}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Open Finance Alerts</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Letter Queue</CardTitle>
            <CardDescription>Approval and payment letter drafts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Payment letter - AP-2026-118
            </div>
            <div className="rounded-md border px-3 py-2">
              Approval letter - AP-2026-109
            </div>
            <div className="rounded-md border px-3 py-2">
              Permit letter - AP-2026-103
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Download Letters</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

