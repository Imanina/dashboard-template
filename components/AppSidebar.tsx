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
  UserCircle,
  ShieldCheck,
  Users,
  FileText,
  BarChart3,
  User,
} from "lucide-react"

import { NavMain } from "../components/NavMain"
import { NavUser } from "../components/NavUser"
import lppsLogo from "../components/ui/lpps-logo.png"
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
import { useAuth } from "../lib/auth-context"
import { DEFAULT_ROLE, isRouteAllowed } from "../lib/role-access"

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
    {
      title: "Profile",
      url: "/profile",
      icon: UserCircle,
      items: [],
    },
  ],
  navSecondary: [],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { role } = useAuth()
  const activeRole = role || DEFAULT_ROLE
  const filteredNavMain = data.navMain.filter((item) => isRouteAllowed(activeRole, item.url))

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
                <a href="#" className="flex w-full items-center justify-center">
                  <div className="flex aspect-square size-14 items-center justify-center">
                    <img src={lppsLogo.src} alt="LPPS" className="h-22 w-22 object-contain" />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-2">
          <NavMain items={filteredNavMain} />
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
