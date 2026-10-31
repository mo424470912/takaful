const V='takaful-v2',CORE=['./','./index.html','./manifest.webmanifest','./logo.png','./logo-full.png','./favicon.png','./icon-192.png','./icon-512.png'];
const HOSTS=['www.gstatic.com','cdn.jsdelivr.net','unpkg.com','cdnjs.cloudflare.com','fonts.googleapis.com','fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin&&!HOSTS.includes(u.hostname))return;
 const page=r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html');
 if(page){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(h=>h||caches.match('./index.html')||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>hit);return hit||net}))});
