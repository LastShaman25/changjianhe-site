"use client";
import {useRef,useState} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import type {Locale} from '@/data/projects';
import {useSiteMotion} from './useSiteMotion';
gsap.registerPlugin(useGSAP);
export default function LearningDemo({locale}:{locale:Locale}) {
 const zh=locale==='zh',enabled=useSiteMotion(),root=useRef<HTMLDivElement>(null);
 const [step,setStep]=useState(0),[ready,setReady]=useState(false),[replay,setReplay]=useState(0);
 const t=(en:string,cn:string)=>zh?cn:en;
 const stages=[t('Observe & protect','观察与保护'),t('Evaluate & adapt','评估与适应'),t('Close the loop','反馈与更新')];
 const dimensions=[t('Learning pace','学习速度'),t('Handling stability','应对稳定性'),t('Concept mastery','概念掌握'),t('Knowledge load capacity','知识负荷容量'),t('Risk signals','风险信号')];
 useGSAP(()=>{
  if(!enabled)return;
  const tl=gsap.timeline({defaults:{ease:'power2.out'}});
  tl.from('.adaptive-detail',{y:14,opacity:0,duration:.5})
   .fromTo('.adaptive-trace',{strokeDashoffset:1},{strokeDashoffset:0,duration:1.8,ease:'none'},0)
   .from('.adaptive-node',{opacity:.35,duration:.65,stagger:.28},.15);
 },{scope:root,dependencies:[step,ready,replay,enabled],revertOnUpdate:true});
 return <div className="learning-demo adaptive-demo" ref={root}>
  <div className="lab-toolbar"><span>{t('Inside the adaptive learning system','自适应学习系统内部')}</span><small>{t('ARCHITECTURE WALKTHROUGH','系统架构演示')}</small></div>
  <div className="lesson-path" role="group" aria-label={t('System stages','系统阶段')}>{stages.map((s,i)=><button key={s} aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span>{s}</button>)}</div>
  <div className="adaptive-flow" aria-label={t('Learning system feedback loop','学习系统反馈回路')}>
   {[t('Learning activity','学习活动'),t('Privacy layer','隐私处理层'),t('Student profile','学生学习画像'),t('Tutor actions','教学行动')].map((x,i)=><div className="adaptive-node" key={x}><small>0{i+1}</small><strong>{x}</strong><span>{[t('Quizzes · time · completion','测验 · 用时 · 完成情况'),t('Structured events only','仅结构化学习事件'),t('Five learning dimensions','五个学习维度'),t('Calibrated instruction','经调整的教学')][i]}</span></div>)}
   <svg className="adaptive-loop" viewBox="0 0 900 42" preserveAspectRatio="none" aria-hidden="true"><path d="M790 2V24H340V2" fill="none" stroke="#66675b"/><path className="adaptive-trace" d="M790 2V24H340V2" pathLength="1" strokeDasharray="1" fill="none" stroke="#ff6559" strokeWidth="2"/></svg>
   <p className="adaptive-loop-label">↶︎ {t('New interactions recalibrate the profile','新的互动持续校准学习画像')}</p>
  </div>
  <div className="adaptive-detail" aria-live="polite">
   {step===0?<><div className="adaptive-heading"><small>{t('01 / FROM ACTIVITY TO SIGNALS','01 / 从活动到信号')}</small><h3>{t('Understand how learning unfolds.','理解学习如何发生。')}</h3></div><div className="adaptive-columns"><div><h4>{t('Academic activity','学业活动')}</h4><div className="adaptive-tags">{[t('Quiz attempts','测验尝试'),t('Time on task','任务用时'),t('Module completion','模块完成'),t('Discussion activity','讨论活动')].map(x=><span key={x}>{x}</span>)}</div></div><div className="adaptive-boundary"><h4>{t('Secure data processing','安全数据处理')}</h4><p>{t('Remove or pseudonymize identifiers. Convert raw logs into structured learning events. Keep sensitive data separate from AI decisions.','移除或假名化身份标识，将原始日志转为结构化学习事件，并将敏感数据与 AI 决策组件分离。')}</p><small>{t('Public view of the privacy boundary','隐私边界的公开示意')}</small></div></div></>:
   step===1?<><div className="adaptive-heading"><small>{t('02 / LEARNING PACE & HANDLING EVALUATOR','02 / 学习速度与应对能力评估引擎')}</small><h3>{t('One profile. Three ways to adapt.','一份画像，三种调整。')}</h3><div className="capability-switch" role="group" aria-label={t('Illustrative learning pattern','示意学习情境')}><button aria-pressed={!ready} onClick={()=>setReady(false)}>{t('Needs reinforcement','需要巩固')}</button><button aria-pressed={ready} onClick={()=>setReady(true)}>{t('Stable & retaining','稳定且保持记忆')}</button></div></div><div className="adaptive-columns"><div className="adaptive-profile">{dimensions.map((d,i)=><div key={d}><span className="adaptive-signal" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><span>{d}</span></div>)}</div><div className="adaptive-actions">{[
 [t('Reinforcement','巩固频率'),ready?t('Less redundant repetition','减少重复巩固'):t('More recall · shorter review intervals','增加回忆练习 · 缩短复习间隔')],
 [t('Knowledge intensity','知识密度'),ready?t('Integrate concepts · advance the pace','整合概念 · 加快进度'):t('Smaller parts · fewer new ideas','拆分内容 · 减少新概念')],
 [t('Teaching action','教学行动'),ready?t('Multi-concept tasks · next resources','多概念任务 · 后续资源'):t('Targeted explanations · structured review','针对性解释 · 结构化复习')]
 ].map(([h,p],i)=><div key={h}><span aria-hidden="true">{ready?'↗︎':'↘︎'}</span><div><small>0{i+1} / {h}</small><strong>{p}</strong></div></div>)}</div></div><p className="adaptive-note">{t('Illustrative patterns from the overview; no student scores or decision thresholds are simulated.','依据概述展示两种情境，不模拟学生评分或决策阈值。')}</p></>:
   <><div className="adaptive-heading"><small>{t('03 / OBSERVE →︎ RECALIBRATE','03 / 观察 →︎ 重新校准')}</small><h3>{t('Each interaction informs the next.','每次互动，影响下一次教学。')}</h3></div><div className="adaptive-columns"><div><h4>{t('Feedback to the profile','反馈至学习画像')}</h4><div className="adaptive-tags">{[t('Performance','表现'),t('Completion time','完成用时'),t('Retention','记忆保持'),t('Repeated confusion','反复困惑')].map(x=><span key={x}>{x}</span>)}</div><p>{t('Tutor actions include course answers, guided discussion, review, adaptive quizzes, and resource recommendations.','教学行动包括课程答疑、引导讨论、复习、自适应测验与资源推荐。')}</p></div><div className="adaptive-boundary"><h4>{t('Instructor insights','教师洞察')}</h4><div className="adaptive-tags">{[t('Progress forecasts','进度预测'),t('Risk alerts','风险提醒'),t('Concept gaps','概念薄弱点'),t('Intervention intensity','干预强度'),t('Class pace distribution','班级学习速度分布')].map(x=><span key={x}>{x}</span>)}</div><p>{t('The same evaluation metrics support instructional oversight.','同一组评估指标也为教师监督提供支持。')}</p></div></div></>}
  </div>
  <div className="adaptive-bottom"><p>{t('Evaluate →︎ Adjust →︎ Observe →︎ Recalibrate','评估 →︎ 调整 →︎ 观察 →︎ 重新校准')}</p><button className="lesson-text-button" disabled={!enabled} onClick={()=>setReplay(n=>n+1)}>{t('Replay flow','重播流程')} ↶︎</button></div>
  <p className="lab-disclosure">{t('Based on the supplied system overview. This visualization illustrates the design; it does not connect to student records or a live evaluation engine.','依据提供的系统概述制作。本可视化展示设计，未连接学生记录或在线评估引擎。')}</p>
 </div>;
}
