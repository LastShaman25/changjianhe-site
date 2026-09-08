"use client";
import {useSyncExternalStore} from 'react';
const event='cj-motion-change';
export function siteMotionEnabled(){
 if(typeof window==='undefined')return false;
 const query=new URLSearchParams(window.location.search).get('motion');
 if(query==='on'||query==='off')return query==='on';
 try{const saved=sessionStorage.getItem('cj-site-motion');if(saved==='on'||saved==='off')return saved==='on';}catch{}
 return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
export function setSiteMotion(enabled:boolean){
 const preference=enabled?'on':'off';
 try{sessionStorage.setItem('cj-site-motion',preference);}catch{}
 const url=new URL(window.location.href);url.searchParams.set('motion',preference);history.replaceState(null,'',url);
 window.dispatchEvent(new Event(event));
}
function subscribe(notify:()=>void){
 const requested=new URLSearchParams(window.location.search).get('motion');
 if(requested==='on'||requested==='off'){try{sessionStorage.setItem('cj-site-motion',requested);}catch{}}

 const media=window.matchMedia('(prefers-reduced-motion: reduce)');
 window.addEventListener(event,notify);window.addEventListener('popstate',notify);media.addEventListener('change',notify);
 return ()=>{window.removeEventListener(event,notify);window.removeEventListener('popstate',notify);media.removeEventListener('change',notify);};
}
export function useSiteMotion(){return useSyncExternalStore(subscribe,siteMotionEnabled,()=>false);}
