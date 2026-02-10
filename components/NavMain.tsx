"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import React, { useState } from "react"
import { useRouter } from "next/router"
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
  const router = useRouter()
  const currentPath = router.asPath
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
        {items.map((item, idx) => {
          const hasActiveChild =
            item.items?.some((subItem) => subItem.url === currentPath) ?? false
          const isActive =
            currentPath === item.url ||
            currentPath.startsWith(`${item.url}/`) ||
            hasActiveChild
          return (
            <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <div className="flex w-full items-center">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`hover:shadow-lg hover:shadow-slate-400/80 dark:hover:shadow-black/50 ${
                    isActive
                      ? "bg-slate-200 text-slate-900 shadow-md shadow-slate-400/40 dark:bg-slate-800 dark:text-white dark:shadow-black/40"
                      : ""
                  }`}
                >
                  <a
                    href={item.url}
                    className="flex flex-1 items-center gap-3"
                    aria-current={isActive ? "page" : undefined}
                  >
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
                      {item.items?.map((subItem) => {
                        const isSubActive = currentPath === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={
                                isSubActive
                                  ? "bg-slate-200 text-slate-900 shadow-sm shadow-slate-400/40 dark:bg-slate-800 dark:text-white dark:shadow-black/40"
                                  : ""
                              }
                            >
                              <a
                                href={subItem.url}
                                className="flex items-center gap-3"
                                aria-current={isSubActive ? "page" : undefined}
                              >
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </div>
                </CollapsibleContent>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
