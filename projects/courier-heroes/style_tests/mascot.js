const C={ink:'#1B1B1F',yel:'#FCE000',coral:'#FF5A4E',bag:'#FFB800',bag2:'#E59A00'};
const PAL={yel:['#FCE000','#D9BE00'],coral:['#FF5A4E','#D93A30'],lime:['#8CD23C','#5E9A1E'],blue:['#5B8DEF','#3A68C9'],orange:['#FEA202','#D47F00'],pink:['#FF7EB6','#E0508E']};
function mascot({id,col='yel',cap=true,bag=true,strap=true,act='none',bike=false}){
  const OL='#24161E',[B,D]=PAL[col];
  const bodyD=`M0 -560 C150 -560 212 -470 212 -330 L202 -160 C198 -112 160 -90 118 -90 L-118 -90 C-160 -90 -198 -112 -202 -160 L-212 -330 C-212 -470 -150 -560 0 -560Z`;
  const body=`<path d="${bodyD}" fill="${B}"/><clipPath id="${id}-cl"><path d="${bodyD}"/></clipPath><g clip-path="url(#${id}-cl)"><ellipse cx="150" cy="-260" rx="120" ry="260" fill="${D}" opacity=".35"/></g>`;
  const bagG=bag?`<g id="${id}-bag"><rect x="-250" y="-560" width="500" height="330" rx="56" fill="${C.bag}"/><rect x="-250" y="-560" width="500" height="64" rx="32" fill="${C.bag2}"/></g>`:'';
  const legs=`<path id="${id}-lg1" d="M-100 -110 h68 v76 a34 34 0 0 1 -68 0z" fill="${D}"/><path id="${id}-lg2" d="M32 -110 h68 v76 a34 34 0 0 1 -68 0z" fill="${D}"/>`;
  const armL=`<ellipse cx="-222" cy="-250" rx="40" ry="84" transform="rotate(18 -222 -250)" fill="${D}"/>`;
  const armR=`<ellipse cx="222" cy="-250" rx="40" ry="84" transform="rotate(-18 222 -250)" fill="${D}"/>`;
  let arms=armL+armR;
  if(act==='wave') arms=armL+`<g id="${id}-arm"><ellipse cx="250" cy="-420" rx="40" ry="84" transform="rotate(-30 250 -420)" fill="${D}"/></g>`;
  const ey=-388;
  const eyes=`<g id="${id}-eyes"><g id="${id}-eL"><ellipse cx="-74" cy="${ey}" rx="54" ry="60" fill="#fff"/><circle cx="-66" cy="${ey+8}" r="32" fill="${OL}"/><circle cx="-56" cy="${ey-6}" r="11" fill="#fff"/></g><g id="${id}-eR"><ellipse cx="74" cy="${ey}" rx="54" ry="60" fill="#fff"/><circle cx="66" cy="${ey+8}" r="32" fill="${OL}"/><circle cx="76" cy="${ey-6}" r="11" fill="#fff"/></g></g>`;
  const mouth=`<path d="M-104 ${ey+98} Q0 ${ey+168} 104 ${ey+98}" stroke="${OL}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  const capG=cap?`<path d="M-150 -520 A150 108 0 0 1 150 -520 Z" fill="#3B3B46"/><path d="M-150 -520 A150 108 0 0 1 -40 -623 Q-112 -590 -128 -520Z" fill="#4C4C59"/><path d="M-156 -524 Q0 -540 156 -524 Q158 -502 126 -494 Q0 -456 -126 -494 Q-158 -502 -156 -524Z" fill="#15151A"/><circle cx="0" cy="-622" r="14" fill="#15151A"/><rect x="-26" y="-596" width="52" height="40" rx="12" fill="${C.yel}"/>`:'';
  const strapG=strap?`<path d="M204 -250 L-196 -128" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/>`:'';
  const core=`${arms}${body}${strapG}${eyes}${mouth}${capG}`;
  if(bike) return bikeRig(id,{bagG,body,strapG,eyes,mouth,capG,D});
  return `<g id="${id}"><ellipse cx="0" cy="4" rx="170" ry="18" fill="#1B1B1F" opacity=".1"/><g id="${id}-sq">${bagG}${legs}${core}</g></g>`;
}
