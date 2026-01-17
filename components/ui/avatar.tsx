import * as React from "react";

type ImageStatus = "loading" | "loaded" | "error";

const AvatarContext = React.createContext<{
  status: ImageStatus;
  setStatus: (status: ImageStatus) => void;
} | null>(null);

export function Avatar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const [status, setStatus] = React.useState<ImageStatus>("loading");
  return (
    <AvatarContext.Provider value={{ status, setStatus }}>
      <span
        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
        {...props}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const ctx = React.useContext(AvatarContext);
  if (!ctx) throw new Error("AvatarImage must be used within an Avatar");
  const { setStatus, status } = ctx;

  React.useEffect(() => {
    setStatus("loading");
  }, [src, setStatus]);

  if (status === "error") {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full ${className}`}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
      {...props}
    />
  );
}

export function AvatarFallback({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const ctx = React.useContext(AvatarContext);
  if (!ctx) throw new Error("AvatarFallback must be used within an Avatar");
  const { status } = ctx;

  if (status === "loaded") {
    return null;
  }

  return (
    <span
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
} 