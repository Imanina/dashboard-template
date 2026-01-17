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
import { Textarea } from "../components/ui/textarea";

export default function CustomersPage() {
  const groups = [
    "Port Klang - North Jetty",
    "Johor - Bulk Cargo",
    "Penang - Private Wharf",
    "East Coast - LNG",
  ];

  const maintenanceItems = [
    "KYC refresh for 12 accounts",
    "License expiry in 30 days (6 accounts)",
    "Pending billing profile updates (4)",
  ];

  return (
    <PageShell
      title="Customers"
      subtitle="Register, onboard, and maintain customer profiles and accounts"
      actions={
        <>
          <Button variant="outline">Import Customers</Button>
          <Button>Register Customer</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-3xl">2,340</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            42 new onboarded this month
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-3xl">2,118</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            18 require maintenance
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Customer Groups</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Grouped by jetty and permit type
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Register & Onboard</CardTitle>
            <CardDescription>
              Capture profile details for new customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Customer Name" />
            <Input placeholder="Company Registration No." />
            <Input placeholder="Primary Contact Email" />
            <Textarea placeholder="Registered Address" />
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit Onboarding</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Groups</CardTitle>
            <CardDescription>
              Create groups based on location, jetty, and tonnage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {groups.map((group) => (
              <div
                key={group}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <span>{group}</span>
                <span className="text-xs text-muted-foreground">24 accounts</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Create Group</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Maintenance</CardTitle>
            <CardDescription>Pending updates and compliance tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {maintenanceItems.map((item) => (
              <div key={item} className="rounded-md border px-3 py-2">
                {item}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline">Review Accounts</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Support Notes</CardTitle>
            <CardDescription>Latest onboarding inquiries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Jetty permit status clarification request
            </div>
            <div className="rounded-md border px-3 py-2">
              Payment letter revision submitted
            </div>
            <div className="rounded-md border px-3 py-2">
              New user access request pending approval
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Open Support Console</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

