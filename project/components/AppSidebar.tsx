"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Folder,
  FileText,
  GitCompare,
} from "lucide-react"

import { NavMain } from "../components/NavMain"
import { NavProjects } from "../components/NavProjects"
import { NavSecondary } from "../components/NavSecondary"
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
      title: "Document Builder",
      url: "/document-builder",
      icon: FileText,
      items: [],
    },
    {
      title: "Document Comparison",
      url: "/document-comparison",
      icon: GitCompare,
      items: [],
    },
    {
      title: "Template Management",
      url: "/template-management",
      icon: BookOpen,
      items: [],
    },
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "#",
    //   icon: LifeBuoy,
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: Send,
    // },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "More", url: "#", icon: MoreHorizontal },
  ],
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
                    <Command className="size-4" />
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
