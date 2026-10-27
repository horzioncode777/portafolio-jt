const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav#main-navigation');
function closeMenu(){
  if(!nav || !menu) return;
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-label','Abrir menú');
}
menu?.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');
  nav.classList.toggle('open',open);
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && nav?.classList.contains('open')){closeMenu();menu.focus()}
});
document.addEventListener('click',event=>{if(!event.target.closest('.nav-shell'))closeMenu()});
window.matchMedia('(min-width:901px)').addEventListener('change',closeMenu);
const copyButton=document.querySelector('#copy-email');
copyButton?.addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  try{
    await navigator.clipboard.writeText('juanes.2529.delgado@gmail.com');
    status.textContent='Correo copiado. Puedes pegarlo en tu aplicación de correo.';
  }catch{
    status.textContent='Selecciona y copia la dirección de correo que aparece arriba.';
  }
});

// Conserva el comportamiento de teclado de <summary> y permite invertir la animación.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.project-learning').forEach(card=>{
  const summary=card.querySelector('summary');
  const body=card.querySelector('.learning-body');
  let expanded=card.open;
  let heightAnimation=null;
  let contentAnimation=null;
  summary.setAttribute('aria-expanded',String(expanded));
  card.classList.toggle('is-expanded',expanded);
  summary.addEventListener('click',event=>{
    event.preventDefault();
    const startHeight=card.getBoundingClientRect().height;
    const startOpacity=card.open?Number(getComputedStyle(body).opacity):0;
    heightAnimation?.cancel();
    contentAnimation?.cancel();
    expanded=!expanded;
    summary.setAttribute('aria-expanded',String(expanded));
    card.classList.toggle('is-expanded',expanded);
    if(reducedMotion.matches || !card.animate){
      card.open=expanded;
      return;
    }
    card.open=true;
    const borders=getComputedStyle(card);
    const closedHeight=summary.getBoundingClientRect().height+
      parseFloat(borders.borderTopWidth)+parseFloat(borders.borderBottomWidth);
    const targetHeight=expanded?card.getBoundingClientRect().height:closedHeight;
    const timing={duration:360,easing:'cubic-bezier(.22,.8,.25,1)'};
    const animation=card.animate([{height:`${startHeight}px`},{height:`${targetHeight}px`}],timing);
    heightAnimation=animation;
    contentAnimation=body.animate([
      {opacity:startOpacity,transform:expanded&&startOpacity===0?'translateY(5px)':'translateY(0)'},
      {opacity:expanded?1:0,transform:expanded?'translateY(0)':'translateY(3px)'}
    ],timing);
    animation.onfinish=()=>{
      if(heightAnimation!==animation)return;
      card.open=expanded;
      heightAnimation=null;
      contentAnimation?.cancel();
      contentAnimation=null;
    };
  });
});
