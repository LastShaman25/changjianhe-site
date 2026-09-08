"use client";
import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
export default function MotionProvider({ children }: {
    children: ReactNode;
}) {
    const path = usePathname();
    useEffect(() => { document.documentElement.lang = path.startsWith('/zh') ? 'zh' : 'en'; }, [path]);
    return children;
}
