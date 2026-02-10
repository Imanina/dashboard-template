import * as React from "react";
import { cn } from "../../lib/utils";

// Sidebar context for mobile/desktop state
const SidebarContext = React.createContext({ isMobile: false });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // For demo, always desktop
  return (
    <SidebarContext.Provider value={{ isMobile: false }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <aside
      className={cn("flex w-64 flex-col", className)}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className ?? ''}`}>{children}</div>;
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-2 py-4 ${className ?? ''}`}>{children}</div>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 flex flex-col gap-2 ${className ?? ''}`}>{children}</div>;
}

export function SidebarGroup({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{children}</div>;
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div className="px-2">{children}</div>;
}

export function SidebarMenu({ children, className }: { children: React.ReactNode, className?: string }) {
  return <ul className={`mt-2 ${className || ''}`}>{children}</ul>;
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode, className?: string }) {
  return <li className={`block ${className || ''}`}>{children}</li>;
}

export function SidebarMenuButton({ children, asChild, size, tooltip, className, ...props }: any) {
  return (
    <button
      className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm w-full ${size === "lg" ? "h-12" : size === "sm" ? "h-8" : "h-10"} ${className ?? ""}`}
      title={tooltip}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarMenuAction({ children, showOnHover, ...props }: any) {
  return (
    <button
      className={`ml-auto p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition ${showOnHover ? "opacity-0 group-hover:opacity-100" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarMenuSub({ children }: { children: React.ReactNode }) {
  return <ul className="ml-6 space-y-1">{children}</ul>;
}

export function SidebarMenuSubItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function SidebarMenuSubButton({ children, asChild, className, ...props }: any) {
  return (
    <button
      className={`flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm w-full ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarInset({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("flex-1 flex flex-col", className)}>{children}</div>
}

export function SidebarTrigger({ className = "", ...props }: any) {
  return (
    <button className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition ${className}`} {...props}>
      <span className="sr-only">Open sidebar</span>
      {/* You can add an icon here if needed */}
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
    </button>
  );
} 