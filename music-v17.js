/* RETO 60: melodía original, suave y generada en el navegador. Sin audios externos. */
(()=>{
'use strict';
let ctx=null,master=null,scheduler=null,step=0,nextTime=0;
const eighth=60/92/2; // 92 bpm; respiración musical sin percusión intensa
const melody=[
  392,0,523,0,587,0,523,0,440,0,392,0,440,0,349,0,
  392,0,440,0,523,0,440,0,392,0,349,0,330,0,392,0,
  440,0,523,0,587,0,659,0,587,0,523,0,440,0,392,0,
  349,0,392,0,440,0,392,0,330,0,294,0,262,0,0,0
];
const bass=[131,175,110,131,175,196,131,131];
function note(freq,at,length,volume){
  if(!ctx||!master||!freq)return;
  const oscillator=ctx.createOscillator(),envelope=ctx.createGain();
  oscillator.type='sine';
  oscillator.frequency.setValueAtTime(freq,at);
  envelope.gain.setValueAtTime(.0001,at);
  envelope.gain.exponentialRampToValueAtTime(volume,at+.035);
  envelope.gain.exponentialRampToValueAtTime(.0001,at+length);
  oscillator.connect(envelope).connect(master);
  oscillator.start(at);
  oscillator.stop(at+length+.02);
}
function pulse(){
  if(!ctx||!master||ctx.state!=='running')return;
  let processed=0;
  while(nextTime<ctx.currentTime+.22&&processed<4){
    const beat=step%melody.length;
    if(melody[beat])note(melody[beat],nextTime,.43,.012);
    if(beat%8===0)note(bass[(beat/8)%bass.length],nextTime,.86,.004);
    nextTime+=eighth;step++;processed++;
  }
  if(nextTime<ctx.currentTime)nextTime=ctx.currentTime+.04;
}
function start(){
  if(scheduler!==null)return true;
  const Audio=window.AudioContext||window.webkitAudioContext;
  if(!Audio)return false;
  try{
    ctx??=new Audio();
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    master=ctx.createGain();
    master.gain.setValueAtTime(.0001,ctx.currentTime);
    master.gain.linearRampToValueAtTime(.7,ctx.currentTime+.28);
    master.connect(ctx.destination);
    nextTime=ctx.currentTime+.07;step=0;
    pulse();
    scheduler=setInterval(pulse,110);
    return true;
  }catch{stop();return false;}
}
function stop(){
  if(scheduler!==null){clearInterval(scheduler);scheduler=null;}
  if(master&&ctx){
    const old=master;master=null;
    try{
      old.gain.cancelScheduledValues(ctx.currentTime);
      old.gain.setTargetAtTime(.0001,ctx.currentTime,.07);
      setTimeout(()=>{try{old.disconnect();}catch{}},1100);
    }catch{try{old.disconnect();}catch{}}
  }
}
window.RETO_MUSIC={start,stop,isPlaying:()=>scheduler!==null};
})();
