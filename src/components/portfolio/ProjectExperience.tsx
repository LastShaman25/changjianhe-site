"use client";
import dynamic from 'next/dynamic';
import type {Locale} from '@/data/projects';
import {useMobileExperience} from './DeviceProvider';
import type {StoryKind} from '../mobile/stories';
const MobileStory=dynamic(()=>import('../mobile/MobileStory'));
const Rental=dynamic(()=>import('./RentalDemo'));
const Elements=dynamic(()=>import('./ElementStory'));
const Research=dynamic(()=>import('./VisualLab'));
const Studio=dynamic(()=>import('./StudioDemo'));
const Learning=dynamic(()=>import('./LearningDemo'));
export default function ProjectExperience({kind,locale}:{kind:StoryKind;locale:Locale}){
 const mobile=useMobileExperience();
 if(mobile)return <MobileStory kind={kind} locale={locale}/>;
 if(kind==='rental')return <Rental locale={locale}/>;
 if(kind==='elements')return <Elements locale={locale}/>;
 if(kind==='studio')return <Studio locale={locale}/>;
 if(kind==='learning')return <Learning locale={locale}/>;
 return <Research kind="aloa" locale={locale}/>;
}
