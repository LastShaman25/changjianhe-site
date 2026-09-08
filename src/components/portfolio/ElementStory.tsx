"use client";
import {useRef,useState} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import type {Locale} from '@/data/projects';
import {useSiteMotion} from './useSiteMotion';
gsap.registerPlugin(useGSAP);
export default function ElementStory({locale}:{locale:Locale}){
 const zh=locale==='zh',enabled=useSiteMotion(),root=useRef<HTMLDivElement>(null);
 const [step,setStep]=useState(0),[mode,setMode]=useState<'similarity'|'grouping'>('similarity'),[replay,setReplay]=useState(0);
 const t=(en:string,cn:string)=>zh?cn:en;
 const labels=[t('Review the input','检查输入'),t('Change the substrate','改变载体'),t('Explore the scope','探索范围')];
 useGSAP(()=>{
  if(!enabled)return;
  gsap.from('.element-mobile-node[aria-current=true]',{x:-14,opacity:.3,duration:.6});
  gsap.from('.element-explanation',{y:14,opacity:.2,duration:.6});
  if(step===0)gsap.from('.record-row',{x:-20,opacity:0,stagger:.15,duration:.6});
  if(step===1){
   const tl=gsap.timeline();
   tl.fromTo('.transfer-packet',{attr:{cx:265},opacity:0},{attr:{cx:353},opacity:1,duration:.8,stagger:.12,ease:'sine.inOut'})
    .to('.transfer-packet',{opacity:0,duration:.2})
    .fromTo('.sealed-frame',{stroke:'#ff6559'},{stroke:'#f6f3ec',duration:.3,yoyo:true,repeat:1},.7)
    .from('.output-element',{opacity:0,scale:0,svgOrigin:'715 155',stagger:.015,duration:.55},1.3);
  }
  if(step===2)gsap.from('.capability-mark',{opacity:0,duration:.8,stagger:.1});
 },{scope:root,dependencies:[enabled,step,replay,mode],revertOnUpdate:true});
 return <div className="visual-lab element-story" ref={root}>
  <div className="lab-toolbar"><span>{t('Elementization / A public view','Elementization / 公开视角')}</span><span>0{step+1} / 03</span></div>
  <div className="element-story-heading"><h3>{[t('Start with structured records.','从结构化记录开始。'),t('The boundary stays opaque.','边界内部保持不透明。'),t('Capabilities need a declared scope.','能力需要明确的范围。')][step]}</h3><button className="lesson-text-button" onClick={()=>setReplay(n=>n+1)} disabled={!enabled}>{t('Replay transition','重播过渡')} ↻</button></div>
  <svg className="element-story-art" viewBox="0 0 900 330" role="img" aria-label={t('Illustrative records enter an opaque private boundary. Computational elements support separately evaluated operations.','示意记录进入不透明的私有边界。计算元素支持需要独立评估的操作。')}>
   <rect x="40" y="45" width="240" height="225" rx="10" fill="#242520" stroke={step===0?'#ff6559':'#55564c'}/><text x="60" y="75" fill="#bbb7af" fontSize="12">{t('SAMPLE RECORDS','示例记录')}</text>
   {[0,1,2].map(i=><g className="record-row" key={i}><rect x="60" y={95+i*51} width="200" height="38" rx="4" fill="#30312a"/><text x="72" y={119+i*51} fill="#c8c4bb" fontSize="12">00{i+1}</text>{[0,1,2].map(j=><rect key={j} x={117+j*43} y={110+i*51} width={22+j*5} height="6" rx="2" fill="#76776a"/>)}</g>)}
   <path d="M280 155H355M535 155H605" stroke="#77786b" strokeDasharray="4 6" fill="none"/>
   <rect className="sealed-frame" x="355" y="64" width="180" height="180" rx="8" fill="#22231f" stroke="#ff6559" strokeWidth="2"/>
   <path d="M429 125v-10a16 16 0 0132 0v10M423 125h44v35h-44z" fill="none" stroke="#ff9b8e" strokeWidth="2"/>
   <text x="445" y="187" textAnchor="middle" fill="#f6f3ec" fontSize="14">ELEMENTIZATION</text><text x="445" y="209" textAnchor="middle" fill="#bdb9b1" fontSize="11">{t('PRIVATE TRANSFORMATION','私有变换')}</text>
   {step===1&&[0,1,2].map(i=><circle className="transfer-packet" key={i} cx="350" cy={145+i*10} r="3" fill="#ff9b8e" opacity="0"/>)}
   <rect x="600" y="45" width="255" height="225" rx="10" stroke={step===2?'#ff6559':'#55564c'} fill="#20211d" strokeDasharray={step===2?'5 5':undefined}/>
   {step===2&&mode==='grouping'&&[0,1,2].map(i=><circle className="capability-mark" key={i} cx={645+i*75} cy={i===1?175:133} r="35" fill="#ff655908" stroke="#9a655b"/>)}
   {Array.from({length:30},(_,i)=>{const a=i*2.4,r=Math.sqrt(i/30)*91;const x=step===2&&mode==='grouping'?645+i%3*75+Math.cos(a)*22:725+Math.cos(a)*r;const y=step===2&&mode==='grouping'?(i%3===1?175:133)+Math.sin(a)*22:155+Math.sin(a)*r*.8;return <circle className="output-element" key={i} cx={x} cy={y} r={i%9===0?4:2.7} fill="#ff9b8e" opacity={step===0?.35:1}/>;})}
   {step===2&&mode==='similarity'&&<g className="capability-mark" stroke="#f6f3ec" fill="none"><path d="M699 155L734 132" strokeDasharray="3 4"/><circle cx="699" cy="155" r="11"/><circle cx="734" cy="132" r="11"/></g>}
   <text x="160" y="304" textAnchor="middle" fill="#bbb7af" fontSize="12">{t('01 / STRUCTURE','01 / 数据结构')}</text><text x="445" y="304" textAnchor="middle" fill="#bbb7af" fontSize="12">{t('02 / PRIVATE BOUNDARY','02 / 私有边界')}</text><text x="727" y="304" textAnchor="middle" fill="#bbb7af" fontSize="12">{t('03 / COMPUTATIONAL ELEMENTS','03 / 计算元素')}</text>
  </svg>
  <div className="element-mobile">{[t('Structured records','结构化记录'),t('Private transformation','私有变换'),t('Computational elements','计算元素')].map((label,i)=><div className="element-mobile-node" aria-current={step===i?'true':undefined} key={label}><div className="element-mobile-symbol" aria-hidden="true">{i===0?<span>▤</span>:i===1?<span>◇</span>:<div className="mini-elements">{Array.from({length:9},(_,n)=><i key={n}/>)}</div>}</div><div><small>0{i+1}</small><h4>{label}</h4><p>{[t('Rows · fields · structure','行 · 字段 · 结构'),t('Internal method stays private','内部方法保持私有'),t('Compare or group within scope','在限定范围内比较或分组')][i]}</p></div></div>)}</div>
  <div className="lab-tabs" role="group" aria-label={t('Elementization stages','Elementization 步骤')}>{labels.map((label,i)=><button key={label} aria-pressed={step===i} onClick={()=>setStep(i)}>0{i+1} {label}</button>)}</div>
  <div className="element-explanation" aria-live="polite"><p>{[t('Rows and fields supply the structure. The records here are schematic, not a real dataset.','行与字段提供数据结构。此处记录是示意，并非真实数据集。'),t('Input crosses a private boundary; a different computational representation emerges. The animation does not depict internal stages.','输入跨越私有边界，产生不同的计算表示。动画不展示内部阶段。'),t('Compare or group elements only within a declared capability scope. Task utility and resistance to attacks need their own evaluations.','仅在声明的能力范围内比较或分组元素。任务效用与攻击抵抗能力需要各自评估。')][step]}</p>{step===2&&<div className="capability-switch" role="group" aria-label={t('Illustrative operations','示意操作')}><button aria-pressed={mode==='similarity'} onClick={()=>setMode('similarity')}>{t('Compare','比较')}</button><button aria-pressed={mode==='grouping'} onClick={()=>setMode('grouping')}>{t('Group','分组')}</button></div>}</div>
  <div className="visual-facts"><div><small>{t('INPUT','输入')}</small><span>{t('Structured records','结构化记录')}</span></div><div><small>{t('PUBLIC VIEW','公开视角')}</small><span>{t('Relationship, not recipe','展示关系，不公开方法')}</span></div><div><small>{t('OUTPUT','输出')}</small><span>{t('Task-scoped computation','限定任务范围的计算')}</span></div></div>
  <small className="lab-disclosure">{t('Illustrative geometry. No mapping runs here; positions and groups are not measured results.','示意几何。此处不运行映射；位置与分组并非实测结果。')}</small>
 </div>;
}
