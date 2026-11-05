const C={ink:'#1B1B1F',yel:'#FCE000'};
const OL='#24161E';
// ---------- mascot (flat jelly-bean, no outlines) ----------
const PAL={yel:['#FCE000','#D9BE00'],hero:['#EFAE5E','#D18D3E'],granny:['#B4A8D6','#9387BC'],mom:['#F2A7B9','#D9849B'],police:['#6C8FD6','#4D6FB3'],scam:['#6E6A80','#4D4960']};
function mascot({id,col='hero',cap='none',bag=null,glasses=false,scarf=null,face='smile',act='none',bike=false}){
  const [B,D]=PAL[col];
  const bodyD=`M0 -560 C150 -560 212 -470 212 -330 L202 -160 C198 -112 160 -90 118 -90 L-118 -90 C-160 -90 -198 -112 -202 -160 L-212 -330 C-212 -470 -150 -560 0 -560Z`;
  const body=`<path d="${bodyD}" fill="${B}"/><clipPath id="${id}-cl"><path d="${bodyD}"/></clipPath><g clip-path="url(#${id}-cl)"><ellipse cx="150" cy="-260" rx="120" ry="260" fill="${D}" opacity=".35"/></g>`;
  const bagG=bag?`<g id="${id}-bag"><rect x="-250" y="-560" width="500" height="330" rx="56" fill="${bag[0]}"/><rect x="-250" y="-560" width="500" height="64" rx="32" fill="${bag[1]}"/></g>`:'';
  const legs=`<path id="${id}-lg1" d="M-100 -110 h68 v76 a34 34 0 0 1 -68 0z" fill="${D}"/><path id="${id}-lg2" d="M32 -110 h68 v76 a34 34 0 0 1 -68 0z" fill="${D}"/>`;
  const armL=`<g id="${id}-armL"><ellipse cx="-222" cy="-250" rx="40" ry="84" transform="rotate(18 -222 -250)" fill="${D}"/></g>`;
  let armR=`<g id="${id}-armR"><ellipse cx="222" cy="-250" rx="40" ry="84" transform="rotate(-18 222 -250)" fill="${D}"/></g>`;
  if(act==='wave') armR=`<g id="${id}-arm"><ellipse cx="250" cy="-420" rx="40" ry="84" transform="rotate(-30 250 -420)" fill="${D}"/></g>`;
  if(act==='hold') armR=`<g id="${id}-arm"><ellipse cx="250" cy="-420" rx="40" ry="92" transform="rotate(-28 250 -420)" fill="${D}"/></g>`;
  if(act==='give') armR=`<g id="${id}-arm"><ellipse cx="270" cy="-300" rx="40" ry="84" transform="rotate(-70 270 -300)" fill="${D}"/></g>`;
  if(act==='phone') armR=`<g id="${id}-arm"><ellipse cx="200" cy="-400" rx="40" ry="84" transform="rotate(20 200 -400)" fill="${D}"/><rect x="150" y="-500" width="70" height="120" rx="16" fill="#1B1B1F"/><rect x="160" y="-488" width="50" height="90" rx="8" fill="#7FD3FF"/></g>`;
  const ey=-388;
  // ---- facial expressions: every face is its own group, switched with face(id,name,t) ----
  const eyeOpen=(dx=0,dy=0,r=32,cls=true)=>[-74,74].map((cx,i)=>`<g id="${id}-e${i?'R':'L'}"><ellipse cx="${cx}" cy="${ey}" rx="54" ry="60" fill="#fff"/><circle ${cls?`class="${id}-pp"`:''} cx="${cx+(i?-8:8)+dx}" cy="${ey+8+dy}" r="${r}" fill="${OL}"/><circle ${cls?`class="${id}-pp"`:''} cx="${cx+(i?-8:8)+dx+10}" cy="${ey-6+dy}" r="11" fill="#fff"/></g>`).join('');
  const EYES={squint:()=>[-74,74].map(cx=>`<ellipse cx="${cx}" cy="${ey+6}" rx="54" ry="44" fill="#fff"/><circle cx="${cx}" cy="${ey+10}" r="30" fill="${OL}"/><circle cx="${cx+10}" cy="${ey-2}" r="10" fill="#fff"/><path d="M${cx-58} ${ey-26} Q${cx} ${ey-46} ${cx+58} ${ey-26}" stroke="${OL}" stroke-width="14" fill="none" stroke-linecap="round"/>`).join(''),open:()=>eyeOpen(),down:()=>eyeOpen(-4,14,30),look:()=>eyeOpen(10,-12),small:()=>eyeOpen(0,4,26),
    wide:()=>[-74,74].map(cx=>`<ellipse cx="${cx}" cy="${ey-6}" rx="60" ry="70" fill="#fff"/><circle cx="${cx}" cy="${ey-2}" r="20" fill="${OL}"/><circle cx="${cx+7}" cy="${ey-10}" r="7" fill="#fff"/>`).join(''),
    happy:()=>`<path d="M-122 ${ey+6} Q-74 ${ey-52} -26 ${ey+6} M26 ${ey+6} Q74 ${ey-52} 122 ${ey+6}" stroke="${OL}" stroke-width="16" fill="none" stroke-linecap="round"/>`,
    glossy:()=>[-74,74].map((cx,i)=>`<ellipse cx="${cx}" cy="${ey}" rx="54" ry="60" fill="#fff"/><circle cx="${cx+(i?-6:6)}" cy="${ey+10}" r="34" fill="${OL}"/><circle cx="${cx+(i?-6:6)+12}" cy="${ey-6}" r="13" fill="#fff"/><circle cx="${cx+(i?-6:6)-10}" cy="${ey+24}" r="6" fill="#fff"/>`).join(''),
    sly:()=>[-74,74].map(cx=>`<ellipse cx="${cx}" cy="${ey+8}" rx="54" ry="40" fill="#fff"/><circle cx="${cx+14}" cy="${ey+12}" r="26" fill="${OL}"/>`).join('')};
  const BROWS={none:'',worried:`<path d="M-130 -462 L-44 -492 M130 -462 L44 -492" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>`,
    up:`<path d="M-122 -494 Q-74 -524 -28 -498 M28 -498 Q74 -524 122 -494" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/>`,
    determined:`<path d="M-126 -494 L-38 -474 M126 -494 L38 -474" stroke="${OL}" stroke-width="14" stroke-linecap="round"/>`,
    raise:`<path d="M-122 -478 L-34 -480 M30 -500 Q74 -532 120 -504" stroke="${OL}" stroke-width="13" fill="none" stroke-linecap="round"/>`,
    sly:`<path d="M-130 -460 L-30 -430 M130 -460 L30 -430" stroke="${OL}" stroke-width="16" stroke-linecap="round"/>`};
  const MOUTHS={smile:`<path d="M-104 ${ey+98} Q0 ${ey+168} 104 ${ey+98}" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`,
    big:`<path d="M-96 ${ey+96} Q0 ${ey+190} 96 ${ey+96}Z" fill="${OL}"/>`,
    worried:`<path d="M-60 ${ey+140} Q0 ${ey+110} 60 ${ey+140}" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/>`,
    o:`<ellipse cx="0" cy="${ey+128}" rx="30" ry="38" fill="${OL}"/>`,
    flat:`<path d="M-46 ${ey+124} L56 ${ey+114}" stroke="${OL}" stroke-width="10" stroke-linecap="round"/>`,
    soft:`<path d="M-50 ${ey+112} Q0 ${ey+142} 50 ${ey+112}" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/>`,
    sly:`<path d="M-70 ${ey+120} Q20 ${ey+150} 90 ${ey+100}" stroke="${OL}" stroke-width="10" fill="none" stroke-linecap="round"/>`};
  const blush=`<ellipse cx="-150" cy="${ey+90}" rx="34" ry="18" fill="#FF8FA3" opacity=".55"/><ellipse cx="150" cy="${ey+90}" rx="34" ry="18" fill="#FF8FA3" opacity=".55"/>`;
  const PRE={resolve:['squint','none','soft'],stern:['open','determined','worried'],calm:['open','none','soft'],brave:['open','determined','flat'],decide:['down','determined','flat'],talk:['sly','sly','o'],pensive:['look','none','flat'],sad:['glossy','worried','worried',1],smile:['open','none','smile'],happy:['happy','none','big',1],worried:['small','worried','worried'],shock:['wide','up','o'],
    puzzled:['look','raise','flat'],tender:['glossy','worried','soft',1],proud:['open','determined','big'],sly:['sly','sly','sly'],relief:['happy','worried','smile',1]};
  const FACES=(Array.isArray(face)?face:[face]);
  const faceG=FACES.map((n,i)=>{const [e,br,m,bl]=PRE[n]; return `<g class="${id}-face" id="${id}-f-${n}" opacity="${i?0:1}"><g class="${id}-eyes">${EYES[e]()}</g>${BROWS[br]}${MOUTHS[m]}${bl?blush:''}</g>`;}).join('');
  const eyes=faceG, mouth='';
  const gl=glasses?`<g fill="none" stroke="#2A2230" stroke-width="12"><rect x="-140" y="-446" width="132" height="112" rx="30"/><rect x="8" y="-446" width="132" height="112" rx="30"/><path d="M-8 -400 L8 -400 M-140 -400 L-196 -416 M140 -400 L196 -416"/></g>`:'';
  let capG='';
  if(cap==='courier') capG=`<path d="M-150 -520 A150 108 0 0 1 150 -520 Z" fill="#46526A"/><path d="M-150 -520 A150 108 0 0 1 -40 -623 Q-112 -590 -128 -520Z" fill="#56637D"/><path d="M-156 -524 Q0 -540 156 -524 Q158 -502 126 -494 Q0 -456 -126 -494 Q-158 -502 -156 -524Z" fill="#2B3344"/><circle cx="0" cy="-622" r="14" fill="#2B3344"/>`;
  if(cap==='hair') capG=`<path d="M-214 -360 C-236 -470 -200 -560 -120 -598 C-60 -628 40 -632 110 -606 C190 -576 236 -490 216 -372 C206 -410 196 -440 176 -458 L160 -428 L136 -470 L104 -442 L80 -482 L44 -452 L14 -490 L-22 -458 L-56 -492 L-88 -456 L-120 -486 L-150 -446 L-172 -470 C-190 -440 -204 -400 -214 -360Z" fill="#1E1A20"/><path d="M-120 -560 Q-40 -600 60 -588 M-70 -530 Q10 -560 90 -548" stroke="#3A3340" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  if(cap==='police') capG=`<path d="M-170 -520 Q-170 -650 0 -660 Q170 -650 170 -520Z" fill="#1F2D52"/><rect x="-172" y="-548" width="344" height="34" fill="#E8EDF7"/><path d="M-160 -516 Q0 -530 200 -500 Q190 -478 140 -476 Q0 -470 -150 -490Z" fill="#11182E"/><circle cx="0" cy="-600" r="26" fill="#F2C14E"/>`;
  const scarfG=scarf?`<path fill-rule="evenodd" d="M-236 -300 C-250 -580 -120 -650 0 -650 C120 -650 250 -580 236 -300 C236 -250 200 -220 160 -214 L-160 -214 C-200 -220 -236 -250 -236 -300Z M0 -520 C-120 -520 -176 -440 -176 -370 C-176 -300 -110 -250 0 -250 C110 -250 176 -300 176 -370 C176 -440 120 -520 0 -520Z" fill="${scarf[0]}"/><path d="M-60 -230 L-120 -120 L-20 -170 L20 -226Z" fill="${scarf[1]}"/>`:'';
  const armsTop = act==='phone';
  const core= armsTop ? `${armL}${body}${eyes}${mouth}${gl}${scarfG}${capG}${armR}` : `${armL}${armR}${body}${eyes}${mouth}${gl}${scarfG}${capG}`;
  if(bike) return bikeRig(id,{body,eyes,mouth,gl,capG,D,box:bag||['#7F92A8','#66798F']});
  return `<g id="${id}"><ellipse cx="0" cy="4" rx="170" ry="18" fill="#1B1B1F" opacity=".1"/><g id="${id}-sq">${bagG}${legs}${core}</g></g>`;
}

const SCARF=['#FFFFFF','#E9E4DA'];
const HERO={col:'hero',cap:'hair',glasses:true,bag:['#7F92A8','#66798F']};
