"use client";
import dynamic from 'next/dynamic';
import type {ReactNode} from 'react';
import {useMobileExperience} from './DeviceProvider';
const DesktopPageMotion=dynamic(()=>import('./DesktopPageMotion'));
export default function PageMotion({children}:{children:ReactNode}){return useMobileExperience()?<div className="mobile-page-content" data-motion="on">{children}</div>:<DesktopPageMotion>{children}</DesktopPageMotion>;}
