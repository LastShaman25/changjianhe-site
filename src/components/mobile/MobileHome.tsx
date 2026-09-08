"use client";
import {useEffect,useRef} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type {Locale} from '@/data/projects';
import portrait from '@/pic/headshot_nbck.png';
import {pageCopy,pick} from '../portfolio/content';
import ArrowIcon from '../portfolio/ArrowIcon';
import MobileStory from './MobileStory';
import './mobile.css';
const chapters=[['rental','rental-agent'],['elements','elementization'],['studio','elementization'],['research','aloa'],['learning','ai-learning-assistant']] as const;
export default function MobileHome({locale}:{locale:Locale}){
 const root=useRef<HTMLElement>(null),bar=useRef<HTMLDivElement>(null),t=(en:string,zh:string)=>locale==='zh'?zh:en;
 useEffect(()=>{let frame=0;const update=()=>{frame=0;const range=document.documentElement.scrollHeight-innerHeight;bar.current?.style.setProperty('transform',`scaleX(${range?scrollY/range:0})`);root.current?.style.setProperty('--hero-shift',`${Math.min(40,scrollY*.12)}px`)};const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};window.addEventListener('scroll',schedule,{passive:true});schedule();return()=>{window.removeEventListener('scroll',schedule);cancelAnimationFrame(frame)}},[]);
 return <main className="mobile-home" id="main-content" ref={root}>
  <div className="mobile-reading-progress" aria-hidden="true" ref={bar}/>
  <section className="mobile-hero" id="intro"><p className="mobile-eyebrow">{t('RESEARCH · MATHEMATICS · PRODUCTS','研究 · 数学 · 产品')}</p><h1>CHANGJIAN<br/><em>HE.</em></h1><div className="mobile-portrait"><div className="mobile-orbit"/><Image src={portrait} alt={t('Changjian He','何昌健')} priority sizes="(max-width: 850px) 88vw, 500px"/></div><h2>{t('Intelligence, built for the real world.','为现实世界构建智能。')}</h2><p>{t('AI researcher, applied mathematician, and founder.','人工智能研究者、应用数学实践者与创业者。')}</p><a className="mobile-link" href="#rental">{t('Explore the work','探索作品')}<ArrowIcon direction="down"/></a></section>
  {chapters.map(([kind,slug],i)=><section className={`mobile-chapter chapter-${kind}`} key={kind} id={kind}><MobileStory kind={kind} locale={locale} chapter={`0${i+1}`} title={(kind==='studio'?t('From theory to a working tool.','从理论到可用工具。'):pick(pageCopy[slug].title,locale)).replace(/\n/g,locale==='zh'?'':' ')} /><Link className="mobile-link" href={`/${locale}/projects/${slug}${kind==='studio'?'#studio':''}`}>{t('Explore the full project','了解完整项目')}<ArrowIcon direction="up-right"/></Link></section>)}
  <section className="mobile-closing" id="contact"><h2>{t('Let’s build what’s next.','一起构建下一步。')}</h2><p>{t('Research collaborations, engineering opportunities, and ambitious products.','研究合作、工程机会与有抱负的产品。')}</p><Link className="mobile-link" href={`/${locale}/contact`}>{t('Start a conversation','开始交流')}<ArrowIcon direction="up-right"/></Link></section>
 </main>;
}
