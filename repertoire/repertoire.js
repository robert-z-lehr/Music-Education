const songs = [
  { id:'imperial', title:'Darth Vader / Imperial March', category:'Film theme', publicDomain:false, note:'A short recognizable excerpt can be added here when you have permission to publish the notation.' },
  { id:'startrek', title:'Star Trek Theme', category:'TV / film theme', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  { id:'starwars', title:'Star Wars Main Theme', category:'Film theme', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  { id:'sun', title:'Here Comes the Sun', category:'Popular song', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  { id:'champions', title:'We Are the Champions', category:'Popular song', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  {
    id:'twinkle', title:'Twinkle, Twinkle, Little Star', category:'Traditional / public domain', publicDomain:true,
    note:'The melody predates Mozart. Mozart later wrote famous variations on the same tune.',
    tempo:'Moderato · ♩ = 88', dynamics:'mp', articulation:'legato, gentle',
    notes:[['C4',1],['C4',1],['G4',1],['G4',1],['A4',1],['A4',1],['G4',2],['F4',1],['F4',1],['E4',1],['E4',1],['D4',1],['D4',1],['C4',2]],
    fingers:[1,1,5,5,5,5,4,4,4,3,3,2,2,1]
  },
  {
    id:'beethoven5', title:'Beethoven: Symphony No. 5', category:'Classical / public domain', publicDomain:true,
    note:'The famous opening four-note idea, simplified to a single treble staff.',
    tempo:'Allegro con brio', dynamics:'f', articulation:'short–short–short–long',
    notes:[['G4',0.5],['G4',0.5],['G4',0.5],['Eb4',2],['F4',0.5],['F4',0.5],['F4',0.5],['D4',2]],
    fingers:[3,3,3,1,2,2,2,1]
  },
  {
    id:'furelise', title:'Beethoven: Für Elise', category:'Classical / public domain', publicDomain:true,
    note:'Beethoven, not Mozart. This is the recognizable opening single-note phrase.',
    tempo:'Poco moto', dynamics:'p', articulation:'light and connected',
    notes:[['E5',0.5],['D#5',0.5],['E5',0.5],['D#5',0.5],['E5',0.5],['B4',0.5],['D5',0.5],['C5',0.5],['A4',1.5]],
    fingers:[5,4,5,4,5,2,4,3,1]
  },
  { id:'interstellar', title:'Interstellar Theme', category:'Film theme', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  { id:'viva', title:'Viva la Vida', category:'Popular song', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  {
    id:'jingle', title:'Jingle Bells', category:'Traditional / public domain', publicDomain:true,
    note:'A compact opening phrase for first-note reading.',
    tempo:'Moderato · ♩ = 96', dynamics:'mf', articulation:'light, buoyant',
    notes:[['E4',1],['E4',1],['E4',2],['E4',1],['E4',1],['E4',2],['E4',1],['G4',1],['C4',1],['D4',1],['E4',2]],
    fingers:[3,3,3,3,3,3,3,5,1,2,3]
  },
  { id:'rainbow', title:'Somewhere Over the Rainbow', category:'Film song', publicDomain:false, note:'Ready for an authorized beginner excerpt.' },
  { id:'autumn', title:'Autumn Leaves', category:'Jazz standard', publicDomain:false, note:'Ready for an authorized beginner excerpt. This tab can later become a bridge into ii–V–I harmony.' },
  { id:'composer', title:'Create Your Own Score', category:'Interactive tool', composer:true, note:'Build a single-line treble-clef melody one symbol at a time, then apply a time signature and learning overlays.' }
];

const palette = ['#a43b3b','#b86d20','#7a7d22','#2f6e4f','#2f5f88','#5b4b8a','#8a3f76'];
const $ = id => document.getElementById(id);
const controls = ['showColors','showNames','showFingers','showDynamics','showTempo','showArticulation'];
let selected = songs.find(s => s.publicDomain) || songs[0];

function renderTabs(){
  const nav = $('songTabs');
  nav.innerHTML = songs.map(song => `
    <button class="song-tab ${song.id===selected.id?'active':''}" data-song="${song.id}" type="button">
      ${song.title}<small>${song.composer?'Build a melody':song.publicDomain?'Score available':'Authorized score needed'}</small>
    </button>`).join('');
  nav.querySelectorAll('.song-tab').forEach(btn => btn.addEventListener('click', () => {
    selected = songs.find(s => s.id === btn.dataset.song);
    renderTabs(); renderSong();
  }));
}

function parseNote(note){
  const m = note.match(/^([A-G])([#b]?)(\d)$/);
  return {letter:m[1], accidental:m[2], octave:Number(m[3])};
}

const diatonic = {C:0,D:1,E:2,F:3,G:4,A:5,B:6};
function staffY(note, top=68, gap=12){
  const n=parseNote(note);
  const step = n.octave*7 + diatonic[n.letter];
  const e4 = 4*7 + diatonic.E;
  const bottomLineY = top + 4*gap;
  return bottomLineY - (step-e4)*(gap/2);
}

function escapeXml(s){ return String(s).replace(/[<>&'\"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'\"':'&quot;'}[c])); }

function addLedgerLines(svgParts, x, y, top, gap){
  const bottom=top+4*gap;
  if(y>bottom+3){ for(let ly=bottom+gap;ly<=y+1;ly+=gap) svgParts.push(`<line x1="${x-12}" y1="${ly}" x2="${x+12}" y2="${ly}" stroke="#555"/>`); }
  if(y<top-3){ for(let ly=top-gap;ly>=y-1;ly-=gap) svgParts.push(`<line x1="${x-12}" y1="${ly}" x2="${x+12}" y2="${ly}" stroke="#555"/>`); }
}

function scoreSvg(song){
  const showColors=$('showColors').checked, showNames=$('showNames').checked, showFingers=$('showFingers').checked;
  const width=Math.max(760, song.notes.length*66+100), height=235, left=54, top=68, gap=12;
  let x=left+35;
  const parts=[`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Beginner treble staff for ${escapeXml(song.title)}">`];
  for(let i=0;i<5;i++) parts.push(`<line x1="${left}" y1="${top+i*gap}" x2="${width-30}" y2="${top+i*gap}" stroke="#444" stroke-width="1.2"/>`);
  parts.push(`<text x="${left+3}" y="${top+39}" font-family="Georgia,serif" font-size="52">𝄞</text>`);

  song.notes.forEach(([note,dur],i)=>{
    const y=staffY(note,top,gap); const info=parseNote(note); const color=showColors?palette[diatonic[info.letter]]:'#171717';
    addLedgerLines(parts,x,y,top,gap);
    if(info.accidental) parts.push(`<text x="${x-18}" y="${y+5}" font-size="17" font-family="Georgia,serif">${info.accidental==='b'?'♭':'♯'}</text>`);
    const filled = dur < 2;
    parts.push(`<ellipse cx="${x}" cy="${y}" rx="7" ry="5.2" transform="rotate(-15 ${x} ${y})" fill="${filled?color:'white'}" stroke="${color}" stroke-width="2"/>`);
    if(dur<4) parts.push(`<line x1="${x+6}" y1="${y}" x2="${x+6}" y2="${y-34}" stroke="${color}" stroke-width="2"/>`);
    if(dur===0.5) parts.push(`<path d="M ${x+6} ${y-34} q 16 8 6 20" fill="none" stroke="${color}" stroke-width="2"/>`);
    if(showNames) parts.push(`<text x="${x}" y="165" text-anchor="middle" font-size="14" font-weight="700" fill="${color}">${escapeXml(note.replace(/\d/,''))}</text>`);
    if(showFingers) parts.push(`<text x="${x}" y="187" text-anchor="middle" font-size="13" fill="#666">${song.fingers?.[i]||''}</text>`);
    x += 48 + (dur>=2?22:0);
  });
  parts.push('</svg>');
  return parts.join('');
}

function renderLibrarySong(){
  $('libraryControls').hidden=false;
  $('composerControls').hidden=true;
  $('practiceStrip').hidden=false;
  const area=$('scoreArea');
  if(!selected.publicDomain){
    area.innerHTML=`<div class="license-panel"><div><p class="eyebrow">SCORE PLACEHOLDER</p><h3>Authorized excerpt needed</h3><p>The tab and teaching controls are ready. Add notation here from a score or transcription you have permission to publish publicly.</p><p class="fine-print">You can still teach the song live or use a lawfully licensed/private resource without placing the notation in this public repository.</p></div></div>`;
    return;
  }
  const meta=[];
  if($('showTempo').checked) meta.push(`<span><strong>Tempo:</strong> ${escapeXml(selected.tempo)}</span>`);
  if($('showDynamics').checked) meta.push(`<span><strong>Dynamics:</strong> ${escapeXml(selected.dynamics)}</span>`);
  if($('showArticulation').checked) meta.push(`<span><strong>Articulation:</strong> ${escapeXml(selected.articulation)}</span>`);
  const notePills = $('showNames').checked ? `<div class="note-guide">${selected.notes.map(([n],i)=>`<span class="note-pill" style="${$('showColors').checked?`color:${palette[diatonic[parseNote(n).letter]]}`:''}">${n.replace(/\d/,'')}${$('showFingers').checked?`<span class="finger">finger ${selected.fingers?.[i]||'–'}</span>`:''}</span>`).join('')}</div>` : '';
  area.innerHTML=`<div class="score-wrap"><div class="score-meta">${meta.join('')}</div>${scoreSvg(selected)}${notePills}</div>`;
}

function renderSong(){
  $('songTitle').textContent=selected.title;
  $('songCategory').textContent=selected.category.toUpperCase();
  $('songNote').textContent=selected.note;
  if(selected.composer) renderComposer(); else renderLibrarySong();
}

controls.forEach(id => $(id).addEventListener('change', renderSong));

// ---------------- Composer ----------------
const composer = {
  events: [], selectedId:null, nextId:1, tempo:80, timeTop:4, timeBottom:4
};
const durationNames={4:'Whole',2:'Half',1:'Quarter',0.5:'Eighth'};
function newEvent(type,pitch,duration){
  return { id:composer.nextId++, type, pitch:type==='note'?pitch:null, duration:Number(duration), dynamic:'', articulation:'', tempo:null, tieStart:false, tieEnd:false, sourceId:null };
}
function selectedEvent(){ return composer.events.find(e=>e.id===composer.selectedId); }
function quarterUnitsPerMeasure(){ return composer.timeTop*(4/composer.timeBottom); }
function durationPieces(duration, room){
  const pieces=[]; let remaining=duration; let firstRoom=room;
  const values=[4,2,1,0.5,0.25];
  while(remaining>0.0001){
    const cap=Math.min(firstRoom,remaining);
    let piece=values.find(v=>v<=cap+0.0001) || cap;
    pieces.push(piece); remaining-=piece; firstRoom-=piece;
    if(firstRoom<=0.0001) firstRoom=quarterUnitsPerMeasure();
  }
  return pieces;
}
function normalizeToMeasures(){
  const measure=quarterUnitsPerMeasure();
  let pos=0; const rebuilt=[];
  composer.events.forEach(original=>{
    const room=measure-pos || measure;
    const pieces=durationPieces(original.duration,room);
    pieces.forEach((dur,idx)=>{
      const copy={...original,id:idx===0?original.id:composer.nextId++,duration:dur,sourceId:original.sourceId||original.id};
      copy.tieEnd = original.type==='note' && idx>0;
      copy.tieStart = original.type==='note' && idx<pieces.length-1;
      if(idx>0){ copy.dynamic=''; copy.articulation=''; copy.tempo=null; }
      rebuilt.push(copy);
      pos += dur;
      if(Math.abs(pos-measure)<0.0001 || pos>measure-0.0001) pos=0;
    });
  });
  composer.events=rebuilt;
  if(!composer.events.some(e=>e.id===composer.selectedId)) composer.selectedId=null;
}
function restGlyph(duration){
  if(duration>=4) return '𝄻';
  if(duration>=2) return '𝄼';
  if(duration>=1) return '𝄽';
  return '𝄾';
}
function composerSvg(){
  if(!composer.events.length) return `<div class="score-empty"><div><strong>Your score is empty.</strong><br/>Choose a pitch and note value above, then add your first note or rest.</div></div>`;
  const showNames=$('composerNames').checked, showColors=$('composerColors').checked;
  const showDyn=$('composerDynamics').checked, showTempo=$('composerTempoMarks').checked, showArt=$('composerArticulations').checked;
  const left=58,top=82,gap=12,measure=quarterUnitsPerMeasure();
  const spacing=68,width=Math.max(760,composer.events.length*spacing+145),height=280;
  const parts=[`<div class="score-wrap"><svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Your beginner score">`];
  for(let i=0;i<5;i++) parts.push(`<line x1="${left}" y1="${top+i*gap}" x2="${width-28}" y2="${top+i*gap}" stroke="#444" stroke-width="1.2"/>`);
  parts.push(`<text x="${left+3}" y="${top+39}" font-family="Georgia,serif" font-size="52">𝄞</text>`);
  parts.push(`<text x="${left+50}" y="${top+18}" font-family="Georgia,serif" font-size="20" font-weight="700">${composer.timeTop}</text><text x="${left+50}" y="${top+42}" font-family="Georgia,serif" font-size="20" font-weight="700">${composer.timeBottom}</text>`);
  if(showTempo) parts.push(`<text x="${left}" y="35" class="marking" font-size="14">♩ = ${composer.tempo}</text>`);
  let x=left+100,pos=0,lastDynamic='';
  const positions=[];
  composer.events.forEach((e,i)=>{
    const centerX=x, isSel=e.id===composer.selectedId;
    positions.push({x:centerX,e});
    parts.push(`<g class="composer-event ${isSel?'selected':''}" data-event-id="${e.id}"><ellipse class="selection-ring" cx="${centerX}" cy="${top+2*gap}" rx="25" ry="56"/>`);
    if(e.type==='note'){
      const y=staffY(e.pitch,top,gap), info=parseNote(e.pitch), color=showColors?palette[diatonic[info.letter]]:'#171717';
      addLedgerLines(parts,centerX,y,top,gap);
      if(info.accidental) parts.push(`<text x="${centerX-18}" y="${y+5}" font-size="17" font-family="Georgia,serif">${info.accidental==='b'?'♭':'♯'}</text>`);
      const filled=e.duration<2;
      parts.push(`<ellipse cx="${centerX}" cy="${y}" rx="7" ry="5.2" transform="rotate(-15 ${centerX} ${y})" fill="${filled?color:'white'}" stroke="${color}" stroke-width="2"/>`);
      if(e.duration<4) parts.push(`<line x1="${centerX+6}" y1="${y}" x2="${centerX+6}" y2="${y-34}" stroke="${color}" stroke-width="2"/>`);
      if(e.duration<=0.5) parts.push(`<path d="M ${centerX+6} ${y-34} q 16 8 6 20" fill="none" stroke="${color}" stroke-width="2"/>`);
      if(showNames) parts.push(`<text x="${centerX}" y="178" text-anchor="middle" font-size="13" font-weight="700" fill="${color}">${escapeXml(e.pitch.replace(/\d/,''))}</text>`);
      if(showArt && e.articulation==='staccato') parts.push(`<circle cx="${centerX}" cy="${y+15}" r="2.3" fill="#333"/>`);
      if(showArt && e.articulation==='accent') parts.push(`<text x="${centerX}" y="${y-45}" text-anchor="middle" class="marking" font-size="18">&gt;</text>`);
      if(showArt && e.articulation==='tenuto') parts.push(`<line x1="${centerX-8}" y1="${y+15}" x2="${centerX+8}" y2="${y+15}" stroke="#333" stroke-width="1.5"/>`);
    } else {
      parts.push(`<text x="${centerX}" y="${top+34}" text-anchor="middle" class="rest-symbol">${restGlyph(e.duration)}</text>`);
      if(showNames) parts.push(`<text x="${centerX}" y="178" text-anchor="middle" font-size="12" fill="#666">rest</text>`);
    }
    if(showDyn && e.dynamic){ lastDynamic=e.dynamic; parts.push(`<text x="${centerX}" y="205" text-anchor="middle" class="marking" font-size="18" font-style="italic">${e.dynamic}</text>`); }
    if(showTempo && e.tempo) parts.push(`<text x="${centerX}" y="55" text-anchor="middle" class="marking" font-size="12">♩=${e.tempo}</text>`);
    parts.push('</g>');
    pos += e.duration;
    if(Math.abs(pos-measure)<0.0001){ parts.push(`<line class="barline" x1="${centerX+34}" y1="${top}" x2="${centerX+34}" y2="${top+4*gap}"/>`); pos=0; }
    x+=spacing;
  });
  positions.forEach((p,i)=>{
    if(!p.e.tieStart || i>=positions.length-1) return;
    const next=positions[i+1];
    if(p.e.type!=='note' || next.e.type!=='note') return;
    const y=Math.max(staffY(p.e.pitch,top,gap),staffY(next.e.pitch,top,gap))+13;
    parts.push(`<path class="tie" d="M ${p.x+8} ${y} Q ${(p.x+next.x)/2} ${y+13} ${next.x-8} ${y}"/>`);
  });
  parts.push('</svg></div>');
  return parts.join('');
}
function updateSelectedEditor(){
  const e=selectedEvent();
  $('selectedFields').hidden=!e; $('selectionHint').hidden=!!e;
  if(!e) return;
  $('editType').value=e.type;
  $('editPitch').value=e.pitch || 'C5'; $('editPitch').disabled=e.type==='rest';
  $('editDuration').value=String(e.duration);
  $('editDynamic').value=e.dynamic || '';
  $('editArticulation').value=e.articulation || '';
  $('editArticulation').disabled=e.type==='rest';
  $('editTempo').value=e.tempo || '';
}
function renderComposer(){
  $('libraryControls').hidden=true; $('composerControls').hidden=false; $('practiceStrip').hidden=true;
  $('scoreArea').innerHTML=composerSvg();
  $('scoreArea').querySelectorAll('.composer-event').forEach(g=>g.addEventListener('click',()=>{ composer.selectedId=Number(g.dataset.eventId); updateSelectedEditor(); renderComposer(); }));
  updateSelectedEditor();
}
function mutateSelected(fn){ const e=selectedEvent(); if(!e)return; fn(e); renderComposer(); }
$('addNoteBtn').addEventListener('click',()=>{ const e=newEvent('note',$('addPitch').value,$('addDuration').value); composer.events.push(e); composer.selectedId=e.id; renderComposer(); });
$('addRestBtn').addEventListener('click',()=>{ const e=newEvent('rest',null,$('addDuration').value); composer.events.push(e); composer.selectedId=e.id; renderComposer(); });
$('editType').addEventListener('change',()=>mutateSelected(e=>{ e.type=$('editType').value; if(e.type==='rest'){ e.pitch=null; e.articulation=''; } else e.pitch=$('editPitch').value; }));
$('editPitch').addEventListener('change',()=>mutateSelected(e=>{ if(e.type==='note')e.pitch=$('editPitch').value; }));
$('editDuration').addEventListener('change',()=>mutateSelected(e=>{ e.duration=Number($('editDuration').value); e.tieStart=false;e.tieEnd=false; }));
$('editDynamic').addEventListener('change',()=>mutateSelected(e=>e.dynamic=$('editDynamic').value));
$('editArticulation').addEventListener('change',()=>mutateSelected(e=>e.articulation=$('editArticulation').value));
$('editTempo').addEventListener('change',()=>mutateSelected(e=>e.tempo=$('editTempo').value?Number($('editTempo').value):null));
$('deleteEventBtn').addEventListener('click',()=>{ composer.events=composer.events.filter(e=>e.id!==composer.selectedId); composer.selectedId=null; renderComposer(); });
$('pieceTempo').addEventListener('change',()=>{ composer.tempo=Math.max(30,Math.min(240,Number($('pieceTempo').value)||80)); renderComposer(); });
$('applyTimeBtn').addEventListener('click',()=>{ composer.timeTop=Math.max(1,Math.min(12,Number($('timeTop').value)||4)); composer.timeBottom=Number($('timeBottom').value); normalizeToMeasures(); renderComposer(); });
['composerNames','composerColors','composerDynamics','composerTempoMarks','composerArticulations'].forEach(id=>$(id).addEventListener('change',renderComposer));

renderTabs();
renderSong();
