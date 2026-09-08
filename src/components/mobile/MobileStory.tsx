"use client";
import {useState,type CSSProperties} from 'react';
import type {Locale} from '@/data/projects';
import ArrowIcon from '../portfolio/ArrowIcon';
import {pick} from '../portfolio/content';
import {stories,type StoryKind} from './stories';
import {useMobileStory} from './useMobileStory';
import MobileArt from './MobileArt';
import './mobile.css';
export default function MobileStory({kind,locale,chapter,title}:{kind:StoryKind;locale:Locale;chapter?:string;title?:string}){
 const distance=kind==='research'?360:kind==='studio'?220:280;
 const story=stories[kind],{track,card,pinned,progress,step,choose}=useMobileStory(story.steps.length,distance),[saved,setSaved]=useState(false);
 const active=story.steps[step],t=(en:string,zh:string)=>locale==='zh'?zh:en;
 return <><div className={`mobile-story mobile-story-${kind}`} ref={track} style={{'--story-travel':`${story.steps.length*distance}px`} as CSSProperties} data-story={kind} data-step={step} data-progress={progress.toFixed(3)}>
  <noscript><style>{`.mobile-story{min-height:0!important}`}</style></noscript>
  <div className="mobile-story-pin" ref={card}>
   {title&&<h2 className="mobile-chapter-title" style={{'--title-size':`${Math.min(6.5,200/title.length)}cqw`} as CSSProperties}>{title}</h2>}
   <div className="mobile-story-card">
   <div className="mobile-story-top"><span>{chapter&&`${chapter} / `}{pick(story.name,locale)}</span><span>0{step+1} / 0{story.steps.length}</span></div>
   <div className="mobile-step-track" aria-hidden="true"><i style={{transform:`scaleX(${progress})`}}/></div>
   <MobileArt kind={kind} locale={locale} progress={progress} step={step}/>
   <div className="mobile-story-copy"><small>{pick(active.label,locale)}</small><h3>{pick(active.title,locale)}</h3><p>{pick(active.description,locale)}</p></div>
   <div className="mobile-story-facts">{active.rows.map(row=><span key={row[0]}>{pick(row,locale)}</span>)}</div>
   {!pinned&&<div className="mobile-story-controls"><button aria-label={t('Previous stage','上一步')} disabled={step===0} onClick={()=>choose(step-1)}><span className="mobile-back"><ArrowIcon direction="right"/></span></button><span>{t('Explore stages','探索步骤')}</span><button aria-label={t('Next stage','下一步')} disabled={step===story.steps.length-1} onClick={()=>choose(step+1)}><ArrowIcon direction="right"/></button></div>}
   <small className="mobile-story-note">{pick(story.note,locale)}</small>
  </div>
  </div>
 </div>
  {kind==='rental'&&<div className="mobile-rental-action"><button aria-pressed={saved} onClick={()=>setSaved(!saved)}>{saved?t('Saved · Remove from shortlist','已保存 · 从候选中移除'):t('Save sample to shortlist','保存示例到候选清单')}<ArrowIcon direction="right"/></button></div>}
 </>;
}
