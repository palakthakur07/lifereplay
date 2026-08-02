import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
}

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-none",
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-5 sm:px-8", sizeMap[size], className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

export { Container };
