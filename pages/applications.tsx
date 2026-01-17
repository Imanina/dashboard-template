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

export default function ApplicationsPage() {
  const pipeline = [
    { status: "Processing", count: 142, detail: "Initial review" },
    { status: "Payment", count: 68, detail: "Awaiting permit fees" },
    { status: "Validation", count: 44, detail: "Compliance checks" },
    { status: "Approval", count: 31, detail: "Final sign-off" },
    { status: "Permit Issued", count: 183, detail: "Ready for statements" },
  ];

  const recentApplications = [
    { id: "AP-2026-118", company: "Selat Marine", status: "Approval" },
    { id: "AP-2026-117", company: "East Coast LNG", status: "Validation" },
    { id: "AP-2026-116", company: "Penang Wharf Co.", status: "Payment" },
    { id: "AP-2026-115", company: "Borneo Industrial", status: "Processing" },
  ];

  return (
    <PageShell
      title="Applications"
      subtitle="Process, validate, and approve customer applications"
      actions={
        <>
          <Button variant="outline">Upload Documents</Button>
          <Button>Create Application</Button>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {pipeline.map((item) => (
          <Card key={item.status}>
            <CardHeader>
              <CardDescription>{item.status}</CardDescription>
              <CardTitle className="text-3xl">{item.count}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {item.detail}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Application Queue</CardTitle>
            <CardDescription>
              Track progress by status and assigned staff
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div>
                  <p className="font-medium">{app.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {app.company}
                  </p>
                </div>
                <span className="text-xs rounded-full bg-muted px-2 py-1">
                  {app.status}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Applications</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Staff</CardTitle>
            <CardDescription>
              Processing, validation, and approval teams
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Processing Officers</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Validation Team</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Approvers</span>
              <span className="font-medium">5</span>
            </div>
            <div className="rounded-md border bg-muted/30 p-3 text-xs">
              Staff IDs and permissions managed per workflow stage
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Assignments</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

