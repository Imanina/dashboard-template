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

export default function ReportsPage() {
  const reportQueue = [
    "Technical report - Q1 Jetty Utilization",
    "Tonnage statement - May 2026",
    "Compliance audit checklist",
  ];

  return (
    <PageShell
      title="Reports & Statements"
      subtitle="Generate, save, and download technical reports and statements"
      actions={
        <>
          <Button variant="outline">Create Template</Button>
          <Button>Generate Report</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Accounts Chart & Statistics</CardTitle>
            <CardDescription>
              Snapshot of accounts, permits, and payment metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                Chart placeholder for KPIs and trends
              </p>
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Download Chart</Button>
            <Button>Save Snapshot</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Queue</CardTitle>
            <CardDescription>Scheduled and draft reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {reportQueue.map((report) => (
              <div key={report} className="rounded-md border px-3 py-2">
                {report}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Schedule</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statements</CardTitle>
            <CardDescription>
              Generate and save permit statements for customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Statement batch - Port Klang
            </div>
            <div className="rounded-md border px-3 py-2">
              Statement batch - Johor
            </div>
            <div className="rounded-md border px-3 py-2">
              Statement batch - East Coast
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Save Drafts</Button>
            <Button>Download Statements</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Reports</CardTitle>
            <CardDescription>
              Export technical analysis and compliance summaries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Jetty operational performance
            </div>
            <div className="rounded-md border px-3 py-2">
              Permit usage by tonnage
            </div>
            <div className="rounded-md border px-3 py-2">
              Customer account health
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Download Reports</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

