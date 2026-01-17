"use client"

import * as React from "react"
import {
  Bell,
  CreditCard,
  Database,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  MapPinned,
  MessageSquare,
  ShieldCheck,
  Users,
  FileText,
  BarChart3,
} from "lucide-react"

import { NavMain } from "../components/NavMain"
import { NavUser } from "../components/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { ModeToggle } from "../components/ModeToggle"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users,
      items: [],
    },
    {
      title: "Applications",
      url: "/applications",
      icon: FileText,
      items: [],
    },
    {
      title: "Payments & Permits",
      url: "/payments",
      icon: CreditCard,
      items: [],
    },
    {
      title: "Reports & Statements",
      url: "/reports",
      icon: BarChart3,
      items: [],
    },
    {
      title: "Staff & Access",
      url: "/staff",
      icon: ShieldCheck,
      items: [],
    },
    {
      title: "Finance Alerts",
      url: "/finance-alerts",
      icon: Bell,
      items: [],
    },
    {
      title: "Storage",
      url: "/storage",
      icon: Database,
      items: [],
    },
    {
      title: "Team Chat",
      url: "/team-chat",
      icon: MessageSquare,
      items: [],
    },
    {
      title: "Customer Support",
      url: "/support",
      icon: LifeBuoy,
      items: [],
    },
    {
      title: "Security",
      url: "/security",
      icon: Lock,
      items: [],
    },
    {
      title: "Jetty Map",
      url: "/jetty-map",
      icon: MapPinned,
      items: [],
    },
  ],
  navSecondary: [],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="flex h-screen flex-col justify-between border-r bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
      {...props}
    >
      <div>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#" className="flex items-center gap-3">
                  <div className="bg-black text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                    <LayoutDashboard className="size-4" />
                  </div>
                  <div className="flex flex-col text-left text-sm leading-tight">
                    <span className="truncate font-medium">Dashboard</span>
                    <span className="truncate text-xs"></span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2">
          <NavMain items={data.navMain} />
        </SidebarContent>
      </div>
      <SidebarFooter className="py-5">
        <div className="w-full flex justify-center items-center">
          <ModeToggle />
        </div>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
