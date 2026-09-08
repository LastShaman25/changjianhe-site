"use client";
import {useRef,type ReactNode} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useSiteMotion} from './useSiteMotion';
gsap.registerPlugin(useGSAP,ScrollTrigger);
export default function PageMotion({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null),enabled=useSiteMotion();
 useGSAP(()=>{
  if(!enabled)return;
  const scope=root.current!;
  gsap.from(scope.querySelectorAll('[data-reveal]'),{y:55,opacity:0,duration:1.1,stagger:.14,ease:'power3.out'});
  gsap.to(scope.querySelector('.editorial-intro h1'),{x:-35,ease:'none',scrollTrigger:{trigger:scope.querySelector('.editorial-intro'),start:'top 56px',end:'bottom 56px',scrub:1}});
  scope.querySelectorAll('[data-rise]').forEach(el=>gsap.from(el,{y:55,opacity:.15,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%',toggleActions:'play none none reverse'}}));
  scope.querySelectorAll('.visual-lab,.studio-demo,.rental-demo,.learning-demo').forEach(el=>gsap.fromTo(el,{y:55,scale:.96},{y:0,scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 40%',scrub:.8}}));
  scope.querySelectorAll('.work-symbol').forEach(el=>gsap.fromTo(el,{y:22,rotation:-12},{y:-22,rotation:12,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
  const portrait=scope.querySelector('.about-portrait img');
  if(portrait)gsap.to(portrait,{scale:1.1,yPercent:-3,ease:'none',scrollTrigger:{trigger:portrait.parentElement,start:'top bottom',end:'bottom top',scrub:1}});
 },{scope:root,dependencies:[enabled],revertOnUpdate:true});
 return <div ref={root} data-motion={enabled?'on':'off'}>{children}</div>;
}
