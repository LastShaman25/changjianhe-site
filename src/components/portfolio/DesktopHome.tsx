"use client";
import type {Locale} from '@/data/projects';
import HomeExperience from './HomeExperience';
import HomeScenes from './HomeScenes';
export default function DesktopHome({locale}:{locale:Locale}){return <HomeExperience locale={locale}><HomeScenes locale={locale}/></HomeExperience>;}
