"use client";
import dynamic from 'next/dynamic';
import type {Locale} from '@/data/projects';
import {useMobileExperience} from './DeviceProvider';
const MobileHome=dynamic(()=>import('../mobile/MobileHome'));
const DesktopHome=dynamic(()=>import('./DesktopHome'));
export default function ResponsiveHome({locale}:{locale:Locale}){return useMobileExperience()?<MobileHome locale={locale}/>:<DesktopHome locale={locale}/>;}
