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
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";

export default function TeamChatPage() {
  const chatMessages = [
    {
      name: "Nurul (Validation)",
      message: "Need updated safety certificate for Jetty 42.",
      time: "09:41",
    },
    {
      name: "Arif (Finance)",
      message: "Payment receipt uploaded for AP-2026-103.",
      time: "09:27",
    },
    {
      name: "Alicia (Support)",
      message: "Customer asked for permit letter revision.",
      time: "09:12",
    },
  ];

  return (
    <PageShell
      title="Team Chat"
      subtitle="Internal communication across processing teams"
      actions={<Button>New Channel</Button>}
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ChatBox</CardTitle>
            <CardDescription>Latest internal messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {chatMessages.map((chat) => (
              <div key={chat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{chat.name}</span>
                  <span>{chat.time}</span>
                </div>
                <p className="text-sm">{chat.message}</p>
                <Separator />
              </div>
            ))}
            <Textarea placeholder="Send a message to the team..." />
          </CardContent>
          <CardFooter>
            <Button>Send Message</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Active team rooms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2"># Processing</div>
            <div className="rounded-md border px-3 py-2"># Validation</div>
            <div className="rounded-md border px-3 py-2"># Approval</div>
            <div className="rounded-md border px-3 py-2"># Finance</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Channels</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

