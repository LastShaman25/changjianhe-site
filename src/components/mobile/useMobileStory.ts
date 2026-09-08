"use client";
import {useEffect,useRef,useState} from 'react';
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
/** Native document scroll + CSS sticky. No transform on the pinned container. */
export function useMobileStory(count:number,stepDistance=280){
 const track=useRef<HTMLDivElement>(null),card=useRef<HTMLDivElement>(null);
 const [progress,setProgress]=useState(0),[manual,setManual]=useState<number|null>(null),[pinned,setPinned]=useState(false);
 const travel=useRef(0),sticky=useRef(false);
 useEffect(()=>{
  const host=track.current!,panel=card.current!;let frame=0,disposed=false;
  const measure=()=>{
   const wasSticky=sticky.current;
   const available=window.visualViewport?.height??innerHeight;
   sticky.current=panel.offsetHeight+84<=available;
   travel.current=sticky.current?count*stepDistance:0;
   host.style.setProperty('--story-travel',`${travel.current}px`);
   host.style.minHeight=`${panel.offsetHeight+travel.current}px`;
   host.dataset.pinned=String(sticky.current);
   setPinned(sticky.current);
   if(sticky.current&&!wasSticky)setManual(null);
  };
  const update=()=>{frame=0;if(disposed)return;
   if(sticky.current){const p=clamp((72-host.getBoundingClientRect().top)/travel.current);setProgress(p);}
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  // Browser bars do not rebuild the sequence. Width/orientation changes do.
  let width=innerWidth;
  const resize=()=>{if(innerWidth!==width){width=innerWidth;measure();schedule()}};
  const observer=new ResizeObserver(()=>{measure();schedule()});observer.observe(panel);
  measure();schedule();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);
  const visibility=new IntersectionObserver(entries=>{for(const entry of entries)host.dataset.visible=String(entry.isIntersecting)},{threshold:0});visibility.observe(host);
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize)};
 },[count,stepDistance]);
 const choose=(index:number)=>{
  const target=Math.max(0,Math.min(count-1,index));
  if(sticky.current&&track.current){setManual(null);window.scrollTo({top:scrollY+track.current.getBoundingClientRect().top-72+(target+.5)/count*travel.current,behavior:'smooth'});}
  else {setProgress(target/count);setManual(target); }
 };
 useEffect(()=>{
  if(manual===null)return;
  let frame=0;const start=performance.now();
  const animate=(now:number)=>{const phase=clamp((now-start)/1800);setProgress((manual+phase*.98)/count);if(phase<1)frame=requestAnimationFrame(animate)};
  frame=requestAnimationFrame(animate);return()=>cancelAnimationFrame(frame);
 },[manual,count]);
 const raw=progress;
 return {track,card,pinned,progress:raw,step:Math.min(count-1,Math.floor(raw*count)),choose};
}
