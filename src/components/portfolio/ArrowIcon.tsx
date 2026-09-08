import type {CSSProperties} from 'react';
export default function ArrowIcon({direction='up-right'}:{direction?:'right'|'down'|'up-right'|'down-right'}) {
 const angle={right:0,down:90,'up-right':-45,'down-right':45}[direction];
 return <svg className="inline-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" style={{'--arrow-angle':`${angle}deg`} as CSSProperties}><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
