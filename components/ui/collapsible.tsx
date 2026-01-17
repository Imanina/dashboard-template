import * as React from "react";

export function Collapsible({ asChild, defaultOpen, children }: { asChild?: boolean; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return React.Children.map(children, (child: any) =>
    React.cloneElement(child, { open, setOpen })
  );
}

export function CollapsibleTrigger({ asChild, children, open, setOpen, ...props }: any) {
  return React.cloneElement(React.Children.only(children), {
    onClick: () => setOpen(!open),
    ...props,
  });
}

export function CollapsibleContent({ children, open }: { children: React.ReactNode; open: boolean }) {
  if (!open) return null;
  return <div>{children}</div>;
} 