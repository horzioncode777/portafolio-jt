// Shared swipe/drag carousel for project previews and the in-page image viewer.
(() => {
 const galleries=[...document.querySelectorAll('.project-gallery')];
 if(!galleries.length)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 function carousel(root,onOpen){
  const track=root.querySelector('.gallery-track');
  const slides=[...track.children];
  let index=0,frame=0,drag=null,suppressClick=false;
  const count=root.querySelector('.gallery-count');
  const caption=root.querySelector('.gallery-caption');
  const progress=root.querySelector('.gallery-progress>span');
  function sync(){
   index=Math.max(0,Math.min(slides.length-1,Math.round(track.scrollLeft/Math.max(1,track.clientWidth))));
   count.textContent=`${index+1} / ${slides.length}`;
   caption.textContent=slides[index].dataset.caption;
   slides.forEach((slide,i)=>{if(slide.matches('button'))slide.tabIndex=i===index?0:-1;});
   if(progress){progress.style.width=`${100/slides.length}%`;progress.style.transform=`translateX(${index*100}%)`;}
  }
  function go(next,instant=false){
   const target=(next+slides.length)%slides.length;
   track.scrollTo({left:target*track.clientWidth,behavior:instant||reduced.matches?'instant':'smooth'});
   if(instant)sync();
  }
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(sync);},{passive:true});
  root.querySelector('.gallery-prev')?.addEventListener('click',()=>go(index-1));
  root.querySelector('.gallery-next')?.addEventListener('click',()=>go(index+1));
  track.addEventListener('click',event=>{
   if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false;return;}
   const slide=event.target.closest('.gallery-open');
   if(slide)onOpen(slides.indexOf(slide));
  },true);
  root.addEventListener('keydown',event=>{
   let next;
   if(event.key==='ArrowRight')next=index+1;
   else if(event.key==='ArrowLeft')next=index-1;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=slides.length-1;
   else return;
   event.preventDefault();go(next);
  });
  // Touch keeps native scrolling and scroll-snap. Mouse drag uses the same track.
  track.addEventListener('pointerdown',event=>{
   if(event.pointerType!=='mouse'||event.button!==0||slides.length<2)return;
   suppressClick=false;
   drag={id:event.pointerId,x:event.clientX,left:track.scrollLeft,moved:false};
  });
  track.addEventListener('pointermove',event=>{
   if(!drag||event.pointerId!==drag.id)return;
   const dx=event.clientX-drag.x;
   if(!drag.moved&&Math.abs(dx)>7){
    drag.moved=true;track.setPointerCapture(event.pointerId);track.classList.add('is-dragging');
   }
   if(drag.moved){event.preventDefault();track.scrollLeft=drag.left-dx;}
  });
  function finish(event){
   if(!drag||event.pointerId!==drag.id)return;
   const previous=drag;drag=null;
   track.classList.remove('is-dragging');
   if(track.hasPointerCapture(event.pointerId))track.releasePointerCapture(event.pointerId);
   if(previous.moved){
    suppressClick=true;
    const dx=event.clientX-previous.x;
    const start=Math.round(previous.left/track.clientWidth);
    const next=Math.abs(dx)>Math.min(55,track.clientWidth*.16)?start+(dx<0?1:-1):start;
    go(Math.max(0,Math.min(slides.length-1,next)));
   }
  }
  track.addEventListener('pointerup',finish);
  track.addEventListener('pointercancel',finish);
  track.addEventListener('lostpointercapture',()=>{drag=null;track.classList.remove('is-dragging');});
  const observer=new ResizeObserver(()=>go(index,true));
  observer.observe(track);
  sync();
  return {go,current:()=>index,destroy:()=>{observer.disconnect();cancelAnimationFrame(frame);}};
 }
 const dialog=document.createElement('dialog');
 dialog.className='project-lightbox';
 dialog.setAttribute('aria-labelledby','gallery-title');
 dialog.innerHTML='<div class="lightbox-shell"><header class="lightbox-header"><div><span>GALERÍA DEL PROYECTO</span><h2 id="gallery-title"></h2></div><button class="lightbox-close" type="button" aria-label="Cerrar galería">✕</button></header><div class="lightbox-content"></div><p class="lightbox-hint">Desliza o usa las flechas para cambiar de imagen · Esc para cerrar</p></div>';
 document.body.append(dialog);
 let modalCarousel=null,origin=null;
 const close=()=>dialog.close();
 dialog.querySelector('.lightbox-close').addEventListener('click',close);
 dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
 dialog.addEventListener('close',()=>{modalCarousel?.destroy();modalCarousel=null;document.documentElement.classList.remove('gallery-modal-open');origin?.focus({preventScroll:true});});
 galleries.forEach(gallery=>{
  const controller=carousel(gallery,selected=>{
   origin=document.activeElement;
   const images=[...gallery.querySelectorAll('.gallery-slide')];
   const viewer=document.createElement('div');
   viewer.className='lightbox-gallery';
   viewer.setAttribute('role','region');
   viewer.setAttribute('aria-roledescription','carrusel');
   viewer.setAttribute('aria-label','Imágenes ampliadas');
   viewer.innerHTML='<div class="gallery-stage"><div class="gallery-track"></div></div><div class="gallery-meta"><span class="gallery-caption"></span><span class="gallery-count" role="status" aria-live="polite"></span></div><div class="gallery-progress" aria-hidden="true"><span></span></div>';
   const track=viewer.querySelector('.gallery-track');
   images.forEach(source=>{
    const slide=document.createElement('div');slide.className='gallery-slide';slide.dataset.caption=source.dataset.caption;
    const img=source.querySelector('img').cloneNode();img.loading='eager';slide.append(img);track.append(slide);
   });
   if(images.length>1){
    for(const [direction,label,symbol] of [['prev','anterior','‹'],['next','siguiente','›']]){
     const button=document.createElement('button');button.type='button';button.className=`gallery-arrow gallery-${direction}`;button.setAttribute('aria-label',`Imagen ${label}`);button.textContent=symbol;viewer.querySelector('.gallery-stage').append(button);
    }
   }
   dialog.querySelector('#gallery-title').textContent=gallery.dataset.galleryName;
   dialog.querySelector('.lightbox-content').replaceChildren(viewer);
   document.documentElement.classList.add('gallery-modal-open');
   dialog.showModal();
   modalCarousel=carousel(viewer,()=>{});modalCarousel.go(selected,true);
   dialog.querySelector('.lightbox-close').focus();
  });
 });
 dialog.addEventListener('keydown',event=>{
  // The close button sits outside the carousel region.
  if(event.target.closest('.lightbox-gallery'))return;
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
   event.preventDefault();modalCarousel?.go(modalCarousel.current()+(event.key==='ArrowRight'?1:-1));
  }
 });
})();
