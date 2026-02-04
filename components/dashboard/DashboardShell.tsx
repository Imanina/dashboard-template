import { ReactNode } from "react"
import { AppSidebar } from "../AppSidebar"
import { ProtectedRoute } from "../ProtectedRoute"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar"

interface SummaryCard {
  title: string
  value: string
  caption: string
}

interface PipelineItem {
  status: string
  count: number
  detail: string
}

interface DashboardShellProps {
  breadcrumbLabel: string
  summaryCards: SummaryCard[]
  pipeline: PipelineItem[]
  notifications: string[]
  headerActions?: ReactNode
}

export function DashboardShell({
  breadcrumbLabel,
  summaryCards,
  pipeline,
  notifications,
  headerActions,
}: DashboardShellProps) {
  const actions = headerActions ?? (
    <>
      <Button variant="outline">Create Application</Button>
      <Button>Register Customer</Button>
    </>
  )

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
                      <BreadcrumbPage>{breadcrumbLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="hidden items-center gap-2 px-4 md:flex">
                <Input className="w-64" placeholder="Search customer, application, jetty" />
                {actions}
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
                      <p className="text-sm text-muted-foreground">{card.caption}</p>
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
                    {pipeline.map((item) => (
                      <div
                        key={item.status}
                        className="rounded-lg border bg-muted/30 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.status}</p>
                          <p className="text-lg font-semibold">{item.count}</p>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
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
  )
}
