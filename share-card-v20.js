/* RETO 60 v2.0 — tarjeta de resultados, sin servicios externos. */
(function(){
"use strict";
const SITE="https://reto60-beta.onrender.com/";
let latest=null, dialog=null, preview=null, status=null, trigger=null;

function text(ctx,str,x,y,size,color,weight="800",align="center"){
  ctx.save();ctx.fillStyle=color;ctx.font=weight+" "+size+"px system-ui, -apple-system, sans-serif";
  ctx.textAlign=align;ctx.textBaseline="middle";ctx.fillText(String(str),x,y);ctx.restore();
}
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.roundRect ? ctx.roundRect(x,y,w,h,r) :
    (ctx.moveTo(x+r,y),ctx.lineTo(x+w-r,y),ctx.quadraticCurveTo(x+w,y,x+w,y+r),
    ctx.lineTo(x+w,y+h-r),ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h),
    ctx.lineTo(x+r,y+h),ctx.quadraticCurveTo(x,y+h,x,y+h-r),
    ctx.lineTo(x,y+r),ctx.quadraticCurveTo(x,y,x+r,y),ctx.closePath());
}
function draw(card,info){
  const ctx=card.getContext("2d");
  const W=1080,H=1350;
  card.width=W;card.height=H;
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,"#171037");bg.addColorStop(.55,"#111b45");bg.addColorStop(1,"#390e53");
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  for(let i=0;i<42;i++){const x=(91+i*167)%W,y=(77+i*271)%H;ctx.fillStyle=i%3===0?"#4bf2e6":"#6b50bc";ctx.globalAlpha=.13+(i%4)*.10;ctx.beginPath();ctx.arc(x,y,2+(i%5),0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  ctx.strokeStyle="#42ece7";ctx.lineWidth=7;roundRect(ctx,55,54,970,1242,46);ctx.stroke();
  const halo=ctx.createRadialGradient(540,312,25,540,312,275);halo.addColorStop(0,"#40d8ee50");halo.addColorStop(1,"#40d8ee00");
  ctx.fillStyle=halo;ctx.beginPath();ctx.arc(540,312,275,0,Math.PI*2);ctx.fill();
  text(ctx,"RETO",525,160,112,"#ffffff","900","right");text(ctx,"60",540,160,126,"#9ef56b","900","left");
  text(ctx,"MI MARCA · TE DESAFÍO",540,249,40,"#63efeb","800");
  ctx.fillStyle="#ffffff12";roundRect(ctx,127,332,826,540,45);ctx.fill();
  if(info.mode==="focus"){
    text(ctx,"MISIÓN COMPLETADA",540,445,54,"#ffffff");
    text(ctx,info.correct+" / 8",540,600,158,"#b9f77e","900");
    text(ctx,"PASOS A TU RITMO",540,741,44,"#ffffff");
  }else if(info.mode==="mini"){
    text(ctx,"RETO 3 DE HOY",540,438,55,"#ffffff");
    text(ctx,info.correct+" / 3",540,590,190,"#b9f77e","900");
    text(ctx,"¿HACÉS EL 3 DE 3?",540,741,49,"#ffffff");
  }else{
    text(ctx,"PUNTOS CONSEGUIDOS",540,439,49,"#ffffff");
    const digits=Number(info.score).toLocaleString("es-AR");
    text(ctx,digits,540,586,digits.length>6?122:175,"#b9f77e","900");
    text(ctx,info.correct+" RESPUESTAS CORRECTAS",540,743,44,"#ffffff");
  }
  text(ctx,"¿PODÉS SUPERARME?",540,971,71,"#ffffff","900");
  text(ctx,"JUGÁ GRATIS · SIN INSTALAR",540,1068,41,"#60f4ea");
  ctx.fillStyle="#b5fa68";roundRect(ctx,171,1134,738,88,42);ctx.fill();
  text(ctx,"reto60-beta.onrender.com",540,1178,42,"#162344","800");
  return card;
}
function makeModal(){
  if(dialog)return;
  dialog=document.createElement("div");dialog.className="reto-card-overlay";dialog.hidden=true;
  dialog.innerHTML='<section class="reto-card-dialog" role="dialog" aria-modal="true" aria-labelledby="reto-card-title"><div class="reto-card-top"><h2 id="reto-card-title">Compartí tu marca</h2><button type="button" id="reto-card-close" aria-label="Cerrar tarjeta">✕</button></div><p>Desafiá a tus amigos con tu propio resultado. No se incluye tu nombre.</p><canvas id="reto-card-preview" role="img" aria-label="Tarjeta con tu puntuación y el enlace de RETO 60"></canvas><div class="reto-card-buttons"><button type="button" id="reto-card-share">Compartir imagen</button><button type="button" id="reto-card-save">Guardar imagen</button><button type="button" id="reto-card-copy">Copiar desafío</button></div><p id="reto-card-status" role="status" aria-live="polite"></p></section>';
  document.body.appendChild(dialog);preview=dialog.querySelector("canvas");status=dialog.querySelector("#reto-card-status");
  dialog.querySelector("#reto-card-close").addEventListener("click",close);
  dialog.addEventListener("click",e=>{if(e.target===dialog)close();});
  dialog.querySelector("#reto-card-share").addEventListener("click",shareImage);
  dialog.querySelector("#reto-card-save").addEventListener("click",saveImage);
  dialog.querySelector("#reto-card-copy").addEventListener("click",copyChallenge);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden){close();e.stopImmediatePropagation();}},true);
}
function setResult(detail){
  if(!detail||typeof detail!=="object")return;
  const mode=["mix","quiz","math","logic","odd","memory","focus","emoji","mini"].includes(detail.mode)?detail.mode:"mix";
  const score=Math.max(0,Math.min(250000,Math.floor(Number(detail.score)||0)));
  const correct=Math.max(0,Math.min(200,Math.floor(Number(detail.correct)||0)));
  let url=SITE;
  try{const u=new URL(detail.url);if(u.origin===new URL(SITE).origin)url=u.toString();}catch{}
  latest={mode,score,correct,url};
}
function open(){
  if(!latest)return;
  makeModal();draw(preview,latest);dialog.hidden=false;status.textContent="";
  dialog.querySelector("#reto-card-close").focus();
  window.RETO_ANALYTICS?.capture("reto60_share_card_created",{mode:latest.mode,score:latest.score,correct:latest.correct});
}
function close(){if(dialog)dialog.hidden=true;trigger?.focus();}
function cardBlob(){return new Promise((resolve,reject)=>preview.toBlob(blob=>blob?resolve(blob):reject(new Error("No se pudo generar la imagen")),"image/png"));}
function invite(){return latest.mode==="focus"?"Terminé Misión Foco en RETO 60. ¿Querés probar?":latest.mode==="mini"?"Hice "+latest.correct+"/3 en RETO 60. ¿Me superás?":"Hice "+latest.score+" puntos en RETO 60. ¿Podés superar mi marca?";}
async function shareImage(){
  const button=dialog.querySelector("#reto-card-share");
  button.disabled=true;status.textContent="Preparando imagen…";
  try{
    const blob=await cardBlob(),file=new File([blob],"reto60-mi-marca.png",{type:"image/png"});
    if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){
      await navigator.share({files:[file],title:"RETO 60",text:invite()+" "+latest.url});
      status.textContent="Imagen enviada al menú de compartir.";
      window.RETO_ANALYTICS?.capture("reto60_share_card_shared",{mode:latest.mode});
    }else{saveBlob(blob);status.textContent="Imagen guardada. Compartila desde tu galería.";}
  }catch(err){status.textContent=err?.name==="AbortError"?"Compartir cancelado.":"No se pudo compartir la imagen. Probá guardarla.";}
  finally{button.disabled=false;}
}
function saveBlob(blob){
  const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="reto60-mi-marca.png";
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),60000);
  window.RETO_ANALYTICS?.capture("reto60_share_card_downloaded",{mode:latest.mode});
}
async function saveImage(){try{saveBlob(await cardBlob());status.textContent="Imagen lista para compartir."; }catch{status.textContent="No se pudo guardar la imagen.";}}
async function copyChallenge(){
  try{await navigator.clipboard.writeText(invite()+"\n"+latest.url);status.textContent="Desafío copiado. Pegalo donde quieras.";
    window.RETO_ANALYTICS?.capture("reto60_share_card_link_copied",{mode:latest.mode});
  }catch{status.textContent="No se pudo copiar. Probá compartir la imagen.";}
}
function mount(){
  const original=document.getElementById("share-btn");
  if(!original)return;
  trigger=document.createElement("button");trigger.type="button";trigger.id="share-card-btn";trigger.className="secondary-btn";trigger.textContent="📸 Compartir tarjeta";
  original.parentNode.insertBefore(trigger,original);
  trigger.addEventListener("click",open);
  document.addEventListener("reto60:finished",ev=>setResult(ev.detail));
}
window.RETO_SHARE_CARD={setResult,open};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
})();