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

export default function SupportPage() {
  return (
    <PageShell
      title="Customer Support"
      subtitle="Support tickets and onboarding assistance"
      actions={
        <>
          <Button variant="outline">Knowledge Base</Button>
          <Button>Create Ticket</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Open Tickets</CardDescription>
            <CardTitle className="text-3xl">14</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            6 high priority
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Average Response Time</CardDescription>
            <CardTitle className="text-3xl">2h 12m</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            SLA compliance at 96%
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Resolved Today</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            3 escalations pending
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Tickets</CardTitle>
            <CardDescription>Latest customer requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Ticket #842 - Permit letter revision
            </div>
            <div className="rounded-md border px-3 py-2">
              Ticket #839 - Account access issue
            </div>
            <div className="rounded-md border px-3 py-2">
              Ticket #835 - Payment clarification request
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Open Ticket Console</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Channels</CardTitle>
            <CardDescription>Dedicated customer assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Hotline: +60 3 5555 1234
            </div>
            <div className="rounded-md border px-3 py-2">
              Email: support@lpps.gov.my
            </div>
            <div className="rounded-md border px-3 py-2">
              Live chat: Available 9 AM - 6 PM
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Support Hours</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

