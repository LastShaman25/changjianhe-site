import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3007';
const cases=[
 ['US overrides Chinese browser','/','US','zh-CN','', '/en'],
 ['China defaults Chinese','/','CN','en-US','', '/zh'],
 ['Missing location defaults English','/','','zh-CN','', '/en'],
 ['Remember Chinese abroad','/','US','en','NEXT_LOCALE=zh','/zh'],
 ['Remember English in China','/','CN','zh','NEXT_LOCALE=en','/en'],
 ['Invalid cookie ignored','/','US','zh','NEXT_LOCALE=fr','/en'],
 ['Nested path and query preserved','/projects/aloa?ref=test','GB','zh','', '/en/projects/aloa?ref=test'],
];
for(const [name,path,country,language,cookie,expected] of cases){
 const res=await fetch(base+path,{redirect:'manual',headers:{'x-vercel-ip-country':country,'accept-language':language,cookie}});
 assert.equal(res.status,307,name);
 assert.equal(new URL(res.headers.get('location'),base).href,base+expected,name);
 assert.match(res.headers.get('cache-control'),/private.*no-store/,name);
}
for(const locale of ['en','zh']){
 const res=await fetch(`${base}/${locale}`,{redirect:'manual',headers:{'x-vercel-ip-country':locale==='en'?'CN':'US','accept-language':locale,cookie:`NEXT_LOCALE=${locale==='en'?'zh':'en'}`}});
 assert.equal(res.status,200,`Explicit ${locale}`);
 assert.match(res.headers.get('set-cookie'),new RegExp(`NEXT_LOCALE=${locale}`));
}
console.log('Passed 9 geographic locale routing checks.');

