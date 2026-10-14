/* RETO 60 v1.9 — consent-first analytics. */
(function(){
'use strict';
const KEY='phc_CYeWw9wfxVjid4vrY92dVYYQLin7QiuGBn3qDJebtNbW',HOST='https://us.i.posthog.com',PREF='reto60-analitica-v1';
const EVENTS=new Set(['reto60_visit','reto60_game_started','reto60_game_completed','reto60_game_abandoned','reto60_share_completed','reto60_reward_unlocked','reto60_level_up']);
const MODES=new Set(['mix','quiz','math','logic','odd','memory','focus','emoji','mini','home']);
let started=false,buffer=[];
function choice(){try{return localStorage.getItem(PREF)}catch{return null}}
function enabled(){return choice()==='yes'}
function save(v){try{localStorage.setItem(PREF,v)}catch{}}
function payload(attrs){
 const p={app:'reto60',version:'1.9'};
 if(!attrs||typeof attrs!=='object')return p;
 if(MODES.has(attrs.mode))p.mode=attrs.mode;
 if(['home','focus','mini','emoji','challenge'].includes(attrs.entry))p.entry=attrs.entry;
 const params=new URLSearchParams(location.search);
 const origin=params.get('utm_source');
 const campaign=params.get('utm_campaign');
 if(['instagram','tiktok','youtube','whatsapp','facebook','reddit','creator','referral','other'].includes(origin))p.source=origin;
 if(['lanzamiento','emoji','reto3','foco'].includes(campaign))p.campaign=campaign;
 for(const k of ['correct','score','questions','xp','badges','level']){
  if(attrs[k]===undefined)continue;
  const v=Number(attrs[k]);
  if(Number.isInteger(v)&&v>=0&&v<=500000)p[k]=v;
 }
 return p;
}
function updateUI(){
 const v=choice(),banner=document.getElementById('analytics-consent');
 if(banner)banner.hidden=v!==null;
 const status=document.getElementById('analytics-status');
 if(status)status.textContent=v==='yes'?'Compartís estadísticas de juego':'Estadísticas externas desactivadas';
 const btn=document.getElementById('analytics-settings-btn');
 if(btn){btn.textContent=v==='yes'?'📊 Desactivar analítica':'📊 Activar analítica';btn.setAttribute('aria-pressed',String(v==='yes'))}
}
function boot(){
 if(started||!enabled())return;
 started=true;
 try{
  /* Cargador asíncrono compatible con el snippet oficial de PostHog. */
  (function(doc,posthog){
    if(window.posthog&&window.posthog.__loaded)return;
    window.posthog=posthog;
    posthog._i=[];
    posthog.init=function(token,opts,name){
      const s=doc.createElement('script');
      s.type='text/javascript';s.async=true;s.crossOrigin='anonymous';
      s.src=opts.api_host+'/static/array.js';
      s.onerror=function(){started=false};
      (doc.head||doc.getElementsByTagName('head')[0]).appendChild(s);
      const target=name?(posthog[name]=[]):posthog;
      target.people=target.people||[];
      for(const method of ['capture','opt_out_capturing','opt_in_capturing','reset','set_config']){
        target[method]=function(){target.push([method].concat(Array.from(arguments)))};
      }
      posthog._i.push([token,opts,name]);
    };
    posthog.__SV=1;
  })(document,window.posthog||[]);
  window.posthog.init(KEY,{
    api_host:HOST,autocapture:false,capture_pageview:false,capture_pageleave:false,
    disable_session_recording:true,person_profiles:'identified_only',
    persistence:'localStorage',capture_performance:false,disable_surveys:true
  });
  for(const entry of buffer.splice(0)){if(enabled())window.posthog.capture(entry[0],entry[1])}
 }catch{started=false}
}
function capture(event,props){
 if(!enabled()||!EVENTS.has(event))return false;
 const data=payload(props);
 if(!started)boot();
 try{
   if(typeof window.posthog?.capture==='function'){window.posthog.capture(event,data);return true}
 }catch{}
 if(buffer.length<25)buffer.push([event,data]);
 return false;
}
function visit(){
 const qs=new URLSearchParams(location.search);
 capture('reto60_visit',{entry:qs.has('reto')?'challenge':qs.get('juego')==='focus'?'focus':qs.get('juego')==='mini'?'mini':qs.get('juego')==='emoji'?'emoji':'home'});
}
function accept(){save('yes');updateUI();boot();try{window.posthog?.opt_in_capturing?.()}catch{}visit()}
function reject(){save('no');buffer=[];updateUI();try{window.posthog?.opt_out_capturing?.();window.posthog?.reset?.()}catch{}}
function toggle(){if(enabled())reject();else accept()}
function mount(){
 document.getElementById('analytics-accept')?.addEventListener('click',accept);
 document.getElementById('analytics-decline')?.addEventListener('click',reject);
 document.getElementById('analytics-settings-btn')?.addEventListener('click',toggle);
 updateUI();if(enabled()){boot();visit()}
}
window.RETO_ANALYTICS={capture,accept,reject,toggle,mount,isEnabled:enabled};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();