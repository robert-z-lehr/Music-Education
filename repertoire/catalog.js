// Catalog additions and grouping. Loaded after repertoire.js so the composer remains independent.
const byId = id => songs.find(s => s.id === id);

Object.assign(byId('twinkle'), {
  note:'Complete familiar tune. The melody predates Mozart; Mozart later wrote famous variations on it.',
  notes:[['C4',1],['C4',1],['G4',1],['G4',1],['A4',1],['A4',1],['G4',2],['F4',1],['F4',1],['E4',1],['E4',1],['D4',1],['D4',1],['C4',2],['G4',1],['G4',1],['F4',1],['F4',1],['E4',1],['E4',1],['D4',2],['G4',1],['G4',1],['F4',1],['F4',1],['E4',1],['E4',1],['D4',2],['C4',1],['C4',1],['G4',1],['G4',1],['A4',1],['A4',1],['G4',2],['F4',1],['F4',1],['E4',1],['E4',1],['D4',1],['D4',1],['C4',2]],
  fingers:Array(42).fill('')
});

Object.assign(byId('jingle'), {
  note:'A longer, complete chorus so the tune is immediately recognizable.',
  notes:[['E4',1],['E4',1],['E4',2],['E4',1],['E4',1],['E4',2],['E4',1],['G4',1],['C4',1.5],['D4',0.5],['E4',4],['F4',1],['F4',1],['F4',1.5],['F4',0.5],['F4',1],['E4',1],['E4',1],['E4',0.5],['E4',0.5],['E4',1],['D4',1],['D4',1],['E4',1],['D4',2],['G4',2],['E4',1],['E4',1],['E4',2],['E4',1],['E4',1],['E4',2],['E4',1],['G4',1],['C4',1.5],['D4',0.5],['E4',4],['F4',1],['F4',1],['F4',1],['F4',1],['F4',1],['E4',1],['E4',1],['G4',1],['G4',1],['F4',1],['D4',1],['C4',4]],
  fingers:Array(49).fill('')
});

const extras = [
 {id:'odejoy',title:'Ode to Joy',category:'Classical / public domain',publicDomain:true,note:'Beethoven’s famous melody, simplified to one hand.',tempo:'Moderato · ♩ = 92',dynamics:'mf',articulation:'connected',notes:[['E4',1],['E4',1],['F4',1],['G4',1],['G4',1],['F4',1],['E4',1],['D4',1],['C4',1],['C4',1],['D4',1],['E4',1],['E4',1.5],['D4',0.5],['D4',2]],fingers:Array(15).fill('')},
 {id:'mary',title:'Mary Had a Little Lamb',category:'Traditional / public domain',publicDomain:true,note:'A compact stepwise melody for first lessons.',tempo:'Moderato · ♩ = 92',dynamics:'mp',articulation:'gentle',notes:[['E4',1],['D4',1],['C4',1],['D4',1],['E4',1],['E4',1],['E4',2],['D4',1],['D4',1],['D4',2],['E4',1],['G4',1],['G4',2],['E4',1],['D4',1],['C4',1],['D4',1],['E4',1],['E4',1],['E4',1],['E4',1],['D4',1],['D4',1],['E4',1],['D4',2],['C4',2]],fingers:Array(26).fill('')},
 {id:'birthday',title:'Happy Birthday',category:'Traditional / public domain',publicDomain:true,note:'The familiar birthday melody, useful for repeated notes and small leaps.',tempo:'Moderato · ♩ = 88',dynamics:'mf',articulation:'singing',notes:[['G4',0.5],['G4',0.5],['A4',1],['G4',1],['C5',1],['B4',2],['G4',0.5],['G4',0.5],['A4',1],['G4',1],['D5',1],['C5',2],['G4',0.5],['G4',0.5],['G5',1],['E5',1],['C5',1],['B4',1],['A4',2],['F5',0.5],['F5',0.5],['E5',1],['C5',1],['D5',1],['C5',2]],fingers:Array(25).fill('')},
 {id:'rowboat',title:'Row, Row, Row Your Boat',category:'Traditional / public domain',publicDomain:true,note:'Simple repeated notes and a clear melodic contour.',tempo:'Moderato · ♩ = 96',dynamics:'mp',articulation:'light',notes:[['C4',1.5],['C4',1.5],['C4',1],['D4',0.5],['E4',1.5],['E4',1],['D4',0.5],['E4',1],['F4',0.5],['G4',3]],fingers:Array(10).fill('')},
 {id:'frere',title:'Frère Jacques',category:'Traditional / public domain',publicDomain:true,note:'A useful early melody for steps, repetition, and phrasing.',tempo:'Moderato · ♩ = 96',dynamics:'mp',articulation:'connected',notes:[['C4',1],['D4',1],['E4',1],['C4',1],['C4',1],['D4',1],['E4',1],['C4',1],['E4',1],['F4',1],['G4',2],['E4',1],['F4',1],['G4',2]],fingers:Array(14).fill('')}
];
const composerIndex=songs.findIndex(s=>s.composer);
songs.splice(composerIndex,0,...extras);

renderTabs = function(){
 const nav=$('songTabs');
 const publicSongs=songs.filter(s=>s.publicDomain);
 const copyrighted=songs.filter(s=>!s.publicDomain&&!s.composer);
 const composerSong=songs.find(s=>s.composer);
 const buttons=arr=>arr.map(song=>`<button class="song-tab ${song.id===selected.id?'active':''}" data-song="${song.id}" type="button">${song.title}<small>${song.publicDomain?'Score available':'Listen & learn by ear'}</small></button>`).join('');
 nav.innerHTML=`<div class="tab-group"><p class="tab-group-title">Public domain</p>${buttons(publicSongs)}</div><div class="tab-group"><p class="tab-group-title">Copyrighted songs</p>${buttons(copyrighted)}</div><div class="tab-group"><p class="tab-group-title">Create</p><button class="song-tab ${composerSong.id===selected.id?'active':''}" data-song="${composerSong.id}" type="button">${composerSong.title}<small>Build a melody</small></button></div>`;
 nav.querySelectorAll('.song-tab').forEach(btn=>btn.addEventListener('click',()=>{selected=songs.find(s=>s.id===btn.dataset.song);renderTabs();renderSong();}));
};

renderTabs();
renderSong();
