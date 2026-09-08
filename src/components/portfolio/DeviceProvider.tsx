"use client";
import {createContext,useContext,useSyncExternalStore,type ReactNode} from 'react';
const MobileContext=createContext(false);
const query='(max-width: 850px), (pointer: coarse) and (max-width: 1100px)';
function subscribe(update:()=>void){const media=window.matchMedia(query);media.addEventListener('change',update);return()=>media.removeEventListener('change',update);}
export function DeviceProvider({initialMobile,children}:{initialMobile:boolean;children:ReactNode}){
 const mobile=useSyncExternalStore(subscribe,()=>window.matchMedia(query).matches,()=>initialMobile);
 return <MobileContext.Provider value={mobile}><div data-experience={mobile?'mobile':'desktop'}>{children}</div></MobileContext.Provider>;
}
export const useMobileExperience=()=>useContext(MobileContext);
