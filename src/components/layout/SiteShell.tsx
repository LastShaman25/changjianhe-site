import {headers} from "next/headers";
import {DeviceProvider} from "@/components/portfolio/DeviceProvider";
import { ReactNode } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

type SiteShellProps = {
  children: ReactNode;
};

export default async function SiteShell({ children }: SiteShellProps) {
  const requestHeaders=await headers();
  const initialMobile=/Mobile|Android|iPhone|iPad/i.test(requestHeaders.get("user-agent") || "");
  return (
    <DeviceProvider initialMobile={initialMobile}><div className="page-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div></DeviceProvider>
  );
}