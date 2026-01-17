"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import React, { useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [openStates, setOpenStates] = useState(() =>
    items.map((item) => !!item.isActive)
  )

  const handleToggle = (idx: number) => {
    setOpenStates((prev) => {
      const next = [...prev]
      next[idx] = !next[idx]
      return next
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item, idx) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <div className="flex w-full items-center">
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="flex flex-1 items-center gap-3">
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <CollapsibleTrigger asChild open={openStates[idx]} setOpen={() => handleToggle(idx)}>
                    <SidebarMenuAction
                      className={`ml-auto transition-transform ${openStates[idx] ? "rotate-90" : ""}`}
                    >
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                ) : null}
              </div>
              {item.items?.length ? (
                <CollapsibleContent open={openStates[idx]}>
                  <div className="ml-2 border-l border-gray-300 pl-4 dark:border-gray-700">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url} className="flex items-center gap-3">
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </div>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
