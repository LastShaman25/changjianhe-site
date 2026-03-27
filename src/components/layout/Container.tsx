import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export default function Container({
  children,
  wide = false,
  className
}: ContainerProps) {
  return (
    <div className={cn(wide ? "site-container-wide" : "site-container", className)}>
      {children}
    </div>
  );
}