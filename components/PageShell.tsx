import * as React from "react";
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
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

interface PageShellProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
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
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              {actions ? (
                <div className="hidden items-center gap-2 px-4 md:flex">
                  {actions}
                </div>
              ) : null}
            </header>
            <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">{title}</h1>
                {subtitle ? (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                ) : null}
              </div>
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
}

