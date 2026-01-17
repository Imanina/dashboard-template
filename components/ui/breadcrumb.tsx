import * as React from "react";

export function Breadcrumb({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className="flex" aria-label="Breadcrumb" {...props}>
      {children}
    </nav>
  );
}

export function BreadcrumbList({ children }: { children: React.ReactNode }) {
  return <ol className="flex items-center gap-1 text-sm">{children}</ol>;
}

export function BreadcrumbItem({ children, className = "", ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className={"flex items-center " + className} {...props}>
      {children}
    </li>
  );
}

export function BreadcrumbLink({ children, href = "#", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className="text-muted-foreground hover:underline" {...props}>
      {children}
    </a>
  );
}

export function BreadcrumbSeparator({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={"mx-1 text-gray-400 " + className} aria-hidden="true" {...props}>
      /
    </span>
  );
}

export function BreadcrumbPage({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className="font-medium text-foreground" aria-current="page" {...props}>
      {children}
    </span>
  );
} 