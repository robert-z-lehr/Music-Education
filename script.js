(() => {
  'use strict';
  const VF = Vex.Flow;
  const state = { scoreKey:'single', showNames:true, showFingers:true, showColors:false, showAccidentals:true, showDynamics:true, showClefs:true, showTempo:true };
  const pitchColors = {c:'#d54b4b',d:'#e08731',e:'#d0a800',f:'#4c9b55',g:'#3689ad',a:'#5969b5',b:'#8a55a0'};
  const $ = id => document.getElementById(id);
  const controls = {
    scoreKey:$('scoreSelect'),showNames:$('showNames'),showFingers:$('showFingers'),showColors:$('showColors'),
    showAccidentals:$('showAccidentals'),showDynamics:$('showDynamics'),showClefs:$('showClefs'),showTempo:$('showTempo')
  };

  function noteName(pitch){ const [raw,oct]=pitch.split('/'); return raw[0].toUpperCase() + (raw.includes('#')?'♯':raw.includes('b')?'♭':''); }
  function makeAnnotation(text, position, size=13){
    return new VF.Annotation(String(text)).setFont('Arial',size,'bold').setJustification(VF.Annotation.Justify.CENTER)
      .setVerticalJustification(position);
  }
  function makeNotes(data, clef){
    return data.map(item => {
      const note = new VF.StaveNote({clef, keys:[item.p], duration:item.d, auto_stem:true});
      if(state.showAccidentals && item.a) note.addAccidental(0,new VF.Accidental(item.a));
      if(state.showNames){
        const ann=makeAnnotation(noteName(item.p),VF.Annotation.VerticalJustify.CENTER,11);
        note.addAnnotation(0,ann);
      }
      if(state.showFingers && item.f){
        const pos=clef==='bass'?VF.Annotation.VerticalJustify.BOTTOM:VF.Annotation.VerticalJustify.TOP;
        note.addAnnotation(0,makeAnnotation(item.f,pos,13));
      }
      if(state.showColors){
        const color=pitchColors[item.p[0].toLowerCase()] || '#333';
        note.setStyle({fillStyle:color,strokeStyle:color});
      }
      return note;
    });
  }
  function addDynamic(notes,value){
    if(state.showDynamics && value && notes[0]) notes[0].addAnnotation(0,makeAnnotation(value,VF.Annotation.VerticalJustify.BOTTOM,15));
  }
  function drawVoice(ctx,stave,notes,time){
    const voice=new VF.Voice({num_beats:Number(time.split('/')[0]),beat_value:Number(time.split('/')[1])});
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice],Math.max(110,stave.getWidth()-70));
    voice.draw(ctx,stave);
  }
  function prepStave(stave,clef,score,isFirst){
    if(state.showClefs) stave.addClef(clef);
    if(isFirst) stave.addTimeSignature(score.time);
    if(isFirst && state.showTempo) stave.setTempo({name:score.tempo.name,duration:'q',bpm:score.tempo.bpm},-5);
  }
  function renderScore(){
    const score=window.SCORE_LIBRARY[state.scoreKey];
    $('scoreTitle').textContent=score.title;
    $('scoreSubtitle').textContent=score.subtitle;
    const host=$('score'); host.innerHTML='';
    const available=Math.max(680,Math.min(1380,host.clientWidth||1200));
    const margin=20, systemGap=score.staffType==='grand'?245:155;
    const per=score.measuresPerSystem;
    const systems=Math.ceil(score.measures.length/per);
    const height=systems*systemGap+70;
    const renderer=new VF.Renderer(host,VF.Renderer.Backends.SVG); renderer.resize(available,height);
    const ctx=renderer.getContext(); ctx.setFont('Arial',10,'');
    for(let s=0;s<systems;s++){
      const start=s*per, count=Math.min(per,score.measures.length-start), usable=available-margin*2;
      const measureW=usable/count;
      const top=40+s*systemGap;
      for(let i=0;i<count;i++){
        const m=score.measures[start+i], x=margin+i*measureW, first=(i===0), globalFirst=(start+i===0);
        if(score.staffType==='single'){
          const stave=new VF.Stave(x,top,measureW); prepStave(stave,score.clef,score,globalFirst); stave.setContext(ctx).draw();
          const notes=makeNotes(m.notes,score.clef); addDynamic(notes,m.dynamic); drawVoice(ctx,stave,notes,score.time);
        } else {
          const treble=new VF.Stave(x,top,measureW), bass=new VF.Stave(x,top+105,measureW);
          prepStave(treble,'treble',score,globalFirst); prepStave(bass,'bass',score,false);
          treble.setContext(ctx).draw(); bass.setContext(ctx).draw();
          if(first){ new VF.StaveConnector(treble,bass).setType(VF.StaveConnector.type.BRACE).setContext(ctx).draw(); }
          new VF.StaveConnector(treble,bass).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();
          const tn=makeNotes(m.treble,'treble'), bn=makeNotes(m.bass,'bass'); addDynamic(tn,m.dynamic);
          drawVoice(ctx,treble,tn,score.time); drawVoice(ctx,bass,bn,score.time);
        }
      }
    }
  }

  const keyMap=['a','w','s','e','d','f','t','g','y','h','u','j','k'];
  const semitoneNames=['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
  function buildKeyboard(id,interactive){
    const host=$(id); host.innerHTML='';
    const start=60,end=84, whites=[];
    for(let midi=start;midi<=end;midi++){
      const pc=midi%12, octave=Math.floor(midi/12)-1, isBlack=[1,3,6,8,10].includes(pc);
      if(!isBlack){
        const el=document.createElement('div'); el.className='key white-key'; el.dataset.midi=midi;
        el.innerHTML=`<span>${semitoneNames[pc]}<small>${octave}</small></span>`; host.appendChild(el); whites.push({midi,el});
      }
    }
    for(let midi=start;midi<=end;midi++){
      const pc=midi%12;if(![1,3,6,8,10].includes(pc))continue;
      const octave=Math.floor(midi/12)-1, prevWhite=whites.filter(w=>w.midi<midi).length-1;
      const el=document.createElement('div'); el.className='key black-key'; el.dataset.midi=midi;
      el.style.left=`calc(${((prevWhite+1)/whites.length)*100}% - 2.05%)`;
      el.innerHTML=`<span>${semitoneNames[pc]}<small>${octave}</small></span>`; host.appendChild(el);
    }
    if(interactive) attachKeyboard(host);
  }
  let audioCtx;
  function frequency(midi){return 440*Math.pow(2,(midi-69)/12)}
  function play(midi,el){
    audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.type='triangle'; osc.frequency.value=frequency(midi); gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.22,audioCtx.currentTime+.015); gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.8);
    osc.connect(gain).connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime+.85); el.classList.add('active');
    setTimeout(()=>el.classList.remove('active'),180);
    const pc=midi%12,oct=Math.floor(midi/12)-1; $('noteReadout').textContent=`${semitoneNames[pc]}${oct} · ${frequency(midi).toFixed(2)} Hz`;
  }
  function attachKeyboard(host){
    host.addEventListener('pointerdown',e=>{const key=e.target.closest('.key');if(key)play(Number(key.dataset.midi),key)});
  }
  document.addEventListener('keydown',e=>{
    if(e.repeat)return; const i=keyMap.indexOf(e.key.toLowerCase()); if(i<0)return;
    const midi=60+i, key=document.querySelector(`#interactiveKeyboard [data-midi="${midi}"]`); if(key)play(midi,key);
  });

  async function downloadPdf(){
    const button=$('downloadPdf'); button.disabled=true; button.textContent='Preparing PDF…';
    try{
      const canvas=await html2canvas($('printArea'),{scale:2,backgroundColor:'#fffaf0',useCORS:true});
      const {jsPDF}=window.jspdf; const pdf=new jsPDF('p','mm','a4');
      const pageW=210,pageH=297,imgW=pageW, imgH=canvas.height*imgW/canvas.width;
      let remaining=imgH,position=0; const data=canvas.toDataURL('image/png');
      pdf.addImage(data,'PNG',0,position,imgW,imgH); remaining-=pageH;
      while(remaining>0){position=remaining-imgH;pdf.addPage();pdf.addImage(data,'PNG',0,position,imgW,imgH);remaining-=pageH;}
      pdf.save(`${window.SCORE_LIBRARY[state.scoreKey].title.replace(/\s+/g,'-').toLowerCase()}.pdf`);
    } finally {button.disabled=false;button.textContent='Download PDF';}
  }
  Object.entries(controls).forEach(([key,el])=>el.addEventListener('change',()=>{state[key]=el.type==='checkbox'?el.checked:el.value;renderScore()}));
  $('downloadPdf').addEventListener('click',downloadPdf);
  let resizeTimer; window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(renderScore,180)});
  buildKeyboard('staticKeyboard',false); buildKeyboard('interactiveKeyboard',true); renderScore();
})();
