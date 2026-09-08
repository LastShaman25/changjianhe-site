"use client";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { mountHomeMotion } from "./home-motion";
import { homeCopy } from "./home-copy";
import type { Locale } from "@/data/projects";
import "./home.css";
gsap.registerPlugin(useGSAP);
export default function HomeExperience({ children, locale }: {
    children: ReactNode;
    locale: Locale;
}) {
    const root = useRef<HTMLDivElement>(null);
    useGSAP((_context, contextSafe) => { if (root.current && contextSafe)
        return mountHomeMotion(root.current, contextSafe, (text: string) => locale === 'zh' ? homeCopy[text] ?? text : text); }, { scope: root, dependencies: [locale], revertOnUpdate: true });
    return <div ref={root} lang={locale} className="portfolio-home still"><div className="reviewbar"><span id="motion-status" role="status"/><button type="button" id="motion-replay">{locale === 'zh' ? '播放动画' : 'Play motion'}</button><button type="button" id="motion-toggle" aria-pressed="false">{locale === 'zh' ? '动态效果' : 'Motion'}</button></div><div className="global-progress" id="global-progress"/>{children}</div>;
}
