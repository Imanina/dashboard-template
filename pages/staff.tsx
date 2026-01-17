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
import { Input } from "../components/ui/input";

export default function StaffPage() {
  const staffRoles = [
    { role: "Processing Officers", count: 12 },
    { role: "Validation Team", count: 8 },
    { role: "Approvers", count: 5 },
    { role: "Finance Liaison", count: 3 },
  ];

  const accessRequests = [
    "Add access for new validator - ID ST-204",
    "Role change request for ST-118",
    "Deactivate account for ST-076",
  ];

  return (
    <PageShell
      title="Staff & Access"
      subtitle="Create staff IDs and manage access rights"
      actions={
        <>
          <Button variant="outline">Audit Logs</Button>
          <Button>Create Staff ID</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Staff IDs</CardDescription>
            <CardTitle className="text-3xl">28</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Assigned to processing, validation, and approval
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Sessions</CardDescription>
            <CardTitle className="text-3xl">16</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Role-based access in effect
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending Access Requests</CardDescription>
            <CardTitle className="text-3xl">4</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Awaiting approval from admins
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Role Overview</CardTitle>
            <CardDescription>Current staffing distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {staffRoles.map((role) => (
              <div
                key={role.role}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span>{role.role}</span>
                <span className="font-medium">{role.count}</span>
              </div>
            ))}
            <div className="rounded-md border bg-muted/30 p-3 text-xs">
              Access is restricted by role and workflow stage
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Roles</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Staff ID</CardTitle>
            <CardDescription>Assign staff to processing workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Staff Name" />
            <Input placeholder="Staff ID (auto-generated)" />
            <Input placeholder="Role (Processing / Validation / Approval)" />
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Activate ID</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Access Requests</CardTitle>
            <CardDescription>Pending permission changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {accessRequests.map((item) => (
              <div key={item} className="rounded-md border px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Review Requests</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Controls</CardTitle>
            <CardDescription>Access restrictions and audit trails</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Multi-factor authentication enforced
            </div>
            <div className="rounded-md border px-3 py-2">
              Session timeout: 20 minutes
            </div>
            <div className="rounded-md border px-3 py-2">
              Audit logs archived for 10 years
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View Security Policy</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

