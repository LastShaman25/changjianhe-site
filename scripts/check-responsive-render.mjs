import assert from 'node:assert/strict';
const base=process.argv[2] || 'http://localhost:3000';
const agents={mobile:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 MicroMessenger/8.0',desktop:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0 Safari/537.36'};
const routes=['','/about','/projects','/research','/accomplishments','/contact','/projects/rental-agent','/projects/elementization','/projects/aloa','/projects/ai-learning-assistant'];
let checked=0;
for(const locale of ['en','zh']){
 for(const mode of ['mobile','desktop']){
  await Promise.all(routes.map(async path=>{
   const url=new URL(`/${locale}${path}`,base),res=await fetch(url,{headers:{'User-Agent':agents[mode]}});
   assert.equal(res.status,200,`${url}: HTTP response`);
   const html=await res.text();
   assert.ok(html.includes(`data-experience="${mode}"`),`${url}: ${mode} initial renderer`);
   assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${url}: single page heading`);
   if(!path){
    assert.equal(html.includes('class="mobile-home"'),mode==='mobile',`${url}: mobile homepage markup`);
    assert.equal(html.includes('class="portfolio-home still"'),mode==='desktop',`${url}: desktop homepage markup`);
   }
   checked++;
  }));
 }
}
console.log(`Passed ${checked} localized server-render checks. Browser scroll and physical-device testing are separate checks.`);
