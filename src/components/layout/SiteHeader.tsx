"use client";
import ArrowIcon from "@/components/portfolio/ArrowIcon";
import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const pages = [['/projects', 'Work', '作品'], ['/about', 'About', '关于'], ['/research', 'Research', '研究'], ['/accomplishments', 'Milestones', '成果'], ['/contact', 'Contact', '联系']];
export default function SiteHeader() {
    const locale = useLocale(), path = usePathname(), zh = locale === 'zh'; const [open, setOpen] = useState(false); const other = zh ? 'en' : 'zh'; return <><a className="skip-link" href="#main-content">{zh ? "跳至内容" : "Skip to content"}</a><header className="portfolio-header"><Link href={`/${locale}`} className="wordmark" aria-label={zh ? '何昌健 · 首页' : 'Changjian He · Home'} onClick={() => setOpen(false)}>CJ/HE<span>RESEARCH INTO REALITY</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? (zh ? '关闭' : 'Close') : (zh ? '菜单' : 'Menu')}</button><nav id="site-navigation" className={open ? 'is-open' : ''} aria-label={zh ? '主导航' : 'Main navigation'}>{pages.map(([href, en, cn]) => <Link key={href} href={`/${locale}${href}`} aria-current={path === `/${locale}${href}` ? 'page' : undefined} onClick={() => setOpen(false)}>{zh ? cn : en}</Link>)}</nav><Link className="language-link" href={path.replace(/^\/(en|zh)/, `/${other}`)} lang={other} onClick={() => setOpen(false)}>{zh ? 'EN' : '中文'} <ArrowIcon direction="up-right"/></Link></header></>; }
