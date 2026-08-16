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
  { id:'autumn', title:'Autumn Leaves', category:'Jazz standard', publicDomain:false, note:'Ready for an authorized beginner excerpt. This tab can later become a bridge into ii–V–I harmony.' }
];

const palette = ['#a43b3b','#b86d20','#7a7d22','#2f6e4f','#2f5f88','#5b4b8a','#8a3f76'];
const $ = id => document.getElementById(id);
const controls = ['showColors','showNames','showFingers','showDynamics','showTempo','showArticulation'];
let selected = songs.find(s => s.publicDomain) || songs[0];

function renderTabs(){
  const nav = $('songTabs');
  nav.innerHTML = songs.map(song => `
    <button class="song-tab ${song.id===selected.id?'active':''}" data-song="${song.id}" type="button">
      ${song.title}<small>${song.publicDomain?'Score available':'Authorized score needed'}</small>
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
function staffY(note){
  const n=parseNote(note);
  const step = n.octave*7 + diatonic[n.letter];
  const e4 = 4*7 + diatonic.E;
  return 92 - (step-e4)*6;
}

function escapeXml(s){ return String(s).replace(/[<>&'"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':'&quot;'}[c])); }

function scoreSvg(song){
  const showColors=$('showColors').checked, showNames=$('showNames').checked, showFingers=$('showFingers').checked;
  const width=Math.max(760, song.notes.length*66+100), height=235, left=54, top=68, gap=12;
  let x=left+35;
  let svg=`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Beginner treble staff for ${escapeXml(song.title)}">`;
  for(let i=0;i<5;i++) svg+=`<line x1="${left}" y1="${top+i*gap}" x2="${width-30}" y2="${top+i*gap}" stroke="#444" stroke-width="1.2"/>`;
  svg+=`<text x="${left+3}" y="${top+39}" font-family="Georgia,serif" font-size="52">𝄞</text>`;

  song.notes.forEach(([note,dur],i)=>{
    const y=staffY(note); const info=parseNote(note); const color=showColors?palette[diatonic[info.letter]]:'#171717';
    const rx=dur>=2?8:7;
    if(y>top+4*gap+3){ for(let ly=top+5*gap;ly<=y;ly+=gap) svg+=`<line x1="${x-12}" y1="${ly}" x2="${x+12}" y2="${ly}" stroke="#555"/>`; }
    if(y<top-3){ for(let ly=top-gap;ly>=y;ly-=gap) svg+=`<line x1="${x-12}" y1="${ly}" x2="${x+12}" y2="${ly}" stroke="#555"/>`; }
    if(info.accidental) svg+=`<text x="${x-18}" y="${y+5}" font-size="17" font-family="Georgia,serif">${info.accidental==='b'?'♭':'♯'}</text>`;
    svg+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="5.2" transform="rotate(-15 ${x} ${y})" fill="${color}"/>`;
    if(dur<2) svg+=`<line x1="${x+6}" y1="${y}" x2="${x+6}" y2="${y-34}" stroke="${color}" stroke-width="2"/>`;
    if(showNames) svg+=`<text x="${x}" y="158" text-anchor="middle" font-size="14" font-weight="700" fill="${color}">${escapeXml(note.replace(/\d/,''))}</text>`;
    if(showFingers) svg+=`<text x="${x}" y="181" text-anchor="middle" font-size="13" fill="#666">${song.fingers?.[i]||''}</text>`;
    x += 48 + (dur>=2?22:0);
  });
  svg+='</svg>';
  return svg;
}

function renderSong(){
  $('songTitle').textContent=selected.title;
  $('songCategory').textContent=selected.category.toUpperCase();
  $('songNote').textContent=selected.note;
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

controls.forEach(id => $(id).addEventListener('change', renderSong));
renderTabs();
renderSong();
