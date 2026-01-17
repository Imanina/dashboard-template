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

export default function JettyMapPage() {
  return (
    <PageShell
      title="Jetty Map"
      subtitle="Mapping of approved private jetties"
      actions={
        <>
          <Button variant="outline">Upload Coordinates</Button>
          <Button>Update Map</Button>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Approved Jetty Map</CardTitle>
            <CardDescription>
              Visualize approved private jetties and coverage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-sm text-muted-foreground">
                Map visualization placeholder
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Open Full Map</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved Jetties</CardTitle>
            <CardDescription>Latest approved locations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="rounded-md border px-3 py-2">
              Port Klang - Jetty 42
            </div>
            <div className="rounded-md border px-3 py-2">
              Johor - Southern Wharf
            </div>
            <div className="rounded-md border px-3 py-2">
              Penang - Private Terminal
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Jetty Data</Button>
          </CardFooter>
        </Card>
      </section>
    </PageShell>
  );
}

