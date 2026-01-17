import { AppSidebar } from "../components/AppSidebar";
import { ProtectedRoute } from "../components/ProtectedRoute";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
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
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

export default function Page() {
  const summaryCards = [
    {
      title: "Total Jetties",
      value: "128",
      caption: "Approved private jetties mapped",
    },
    {
      title: "Total Tonnage",
      value: "1.84M",
      caption: "Permitted tonnage this quarter",
    },
    {
      title: "Applications",
      value: "468",
      caption: "89 pending approvals",
    },
    {
      title: "Customer Accounts",
      value: "2,340",
      caption: "42 new onboarded this month",
    },
  ];

  const applicationPipeline = [
    {
      status: "Processing",
      count: 142,
      detail: "Awaiting initial review",
    },
    {
      status: "Payment",
      count: 68,
      detail: "Permit fees based on tonnage",
    },
    {
      status: "Validation",
      count: 44,
      detail: "Document verification and compliance",
    },
    {
      status: "Approval",
      count: 31,
      detail: "Pending final sign-off",
    },
    {
      status: "Permit Issued",
      count: 183,
      detail: "Ready for statement generation",
    },
  ];

  const notifications = [
    "New message from Finance Department",
    "Approval requested for AP-2026-118",
    "Customer support ticket #842 updated",
  ];

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex flex-1 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">LPPS</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Operations Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="hidden items-center gap-2 px-4 md:flex">
                <Input
                  className="w-64"
                  placeholder="Search customer, application, jetty"
                />
                <Button variant="outline">Create Application</Button>
                <Button>Register Customer</Button>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                  <Card key={card.title}>
                    <CardHeader>
                      <CardDescription>{card.title}</CardDescription>
                      <CardTitle className="text-3xl">{card.value}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        {card.caption}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <section className="grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Application Pipeline</CardTitle>
                    <CardDescription>
                      Track application status, payment, validation, and approval
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    {applicationPipeline.map((item) => (
                      <div
                        key={item.status}
                        className="rounded-lg border bg-muted/30 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.status}</p>
                          <p className="text-lg font-semibold">{item.count}</p>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline">Manage Applications</Button>
                    <Button>Assign Staff</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Push alerts and new requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.map((note) => (
                      <div
                        key={note}
                        className="rounded-lg border border-dashed px-3 py-2 text-sm"
                      >
                        {note}
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Open Inbox</Button>
                  </CardFooter>
                </Card>
              </section>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
} 