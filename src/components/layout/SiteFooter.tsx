import ArrowIcon from "@/components/portfolio/ArrowIcon";
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
export default async function SiteFooter() { const locale = await getLocale(), zh = locale === 'zh'; return <footer className="portfolio-footer"><Link className="wordmark" href={`/${locale}`}>CJ/HE</Link><p>{zh ? '研究者 · 应用数学 · 创业者' : 'Researcher · Applied mathematician · Founder'}</p><Link href={`/${locale}/contact`}>{zh ? '开始交流' : 'Start a conversation'} <ArrowIcon direction="up-right"/></Link><span>© {new Date().getFullYear()} Changjian He</span></footer>; }
