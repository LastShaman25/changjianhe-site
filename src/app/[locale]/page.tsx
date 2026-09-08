import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import ResponsiveHome from "@/components/portfolio/ResponsiveHome";
import { buildPageMetadata } from "@/lib/seo";
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {locale}=await params;return buildPageMetadata({locale,pathname:'/',title:locale==='zh'?'何昌健 · 研究与实践':'Changjian He · Research into reality',description:locale==='zh'?'人工智能研究、应用数学与产品实践。':'AI research, applied mathematics, and products built for the real world.'});}
export default async function Home({params}:Props){const {locale}=await params;return <SiteShell><ResponsiveHome locale={locale}/></SiteShell>;}
