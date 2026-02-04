import * as React from "react";

const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative" ref={containerRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  const child = React.Children.only(children) as React.ReactElement<any, any>;
  const handleClick = (e: React.MouseEvent) => {
    child.props.onClick?.(e);
    ctx.setOpen(!ctx.open);
  };
  return React.cloneElement(child, {
    onClick: handleClick,
  });
}

export function DropdownMenuContent({
  children,
  className = "",
  side = "bottom",
  align = "center",
  sideOffset = 0,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx || !ctx.open) return null;

  const baseClasses =
    "absolute z-50 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none";

  let positionClasses = "";
  let marginStyle: React.CSSProperties = {};

  if (side === "right") {
    positionClasses += "left-full ";
    if (align === "end") {
      positionClasses += "bottom-0";
    } else if (align === "start") {
      positionClasses += "top-0";
    } else {
      // center
      positionClasses += "top-1/2 -translate-y-1/2";
    }
    marginStyle = { marginLeft: `${sideOffset}px` };
  } else {
    // default to 'bottom'
    positionClasses += "top-full ";
    if (align === "end") {
      positionClasses += "right-0";
    } else if (align === "start") {
      positionClasses += "left-0";
    } else {
      // center
      positionClasses += "left-1/2 -translate-x-1/2";
    }
    marginStyle = { marginTop: `${sideOffset}px` };
  }

  return (
    <div
      className={`${baseClasses} ${positionClasses} ${className}`}
      style={marginStyle}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
    >
      {children}
    </button>
  );
} 

export function DropdownMenuSeparator() {
    return (
      <div
        className="my-1 h-px bg-gray-200 dark:bg-gray-700"
        role="separator"
      />
    );
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
    return <div className="py-1">{children}</div>;
}

export function DropdownMenuLabel({ children, className = "", ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 ${className}`} {...props}>
      {children}
    </div>
  );
}