// A single CV action requests two separate, same-origin PDF downloads.
(() => {
 let notice,locked=false;
 function showNotice(urls){
  if(!notice){
   notice=document.createElement('aside');notice.className='cv-download-notice';notice.setAttribute('aria-label','Descarga de hojas de vida');
   notice.innerHTML='<button class="cv-notice-close" type="button" aria-label="Cerrar aviso de descarga">×</button><div role="status"><strong>Tus hojas de vida</strong><p>Español e inglés, en dos PDF separados.</p></div><div class="cv-file-links"><a>Español · PDF ↓</a><a>Inglés · PDF ↓</a></div><p class="cv-download-help">Si tu navegador pide permiso, permite las descargas múltiples. También puedes descargar cada PDF aquí.</p>';
   notice.querySelector('button').addEventListener('click',()=>{notice.hidden=true;});
   document.addEventListener('keydown',event=>{if(event.key==='Escape')notice.hidden=true;});
   document.body.append(notice);
  }
  notice.querySelectorAll('a').forEach((link,index)=>{link.href=urls[index];link.download=urls[index].split('/').pop();});
  notice.hidden=false;
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-cv-download]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  if(locked)return;
  locked=true;
  const urls=[link.href,new URL(link.dataset.cvEn,link.href).href];
  function startDownload(url){
   const download=document.createElement('a');download.href=url;download.download=url.split('/').pop();download.hidden=true;
   document.body.append(download);download.click();download.remove();
  }
  startDownload(urls[0]);
  // Space the requests so the browser can register both downloads.
  setTimeout(()=>startDownload(urls[1]),500);
  showNotice(urls);
  setTimeout(()=>{locked=false;},1000);
 });
})();
