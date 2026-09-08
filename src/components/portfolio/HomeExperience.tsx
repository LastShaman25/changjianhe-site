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
    return <div ref={root} lang={locale} className="portfolio-home still"><div className="global-progress" id="global-progress"/>{children}</div>;
}
