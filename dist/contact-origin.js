// Classic script also runs when a local file blocks ES module imports.
const contactForm=document.querySelector('#contact-form');
if(contactForm){
 const status=document.querySelector('#contact-form-status');
 if(location.protocol==='file:'){
  const explain=()=>{
   status.dataset.state='error';
   status.textContent='Para enviar mensajes, abre el sitio con «Abrir portafolio.cmd», en la carpeta del proyecto. El formulario necesita una dirección http:// o https://.';
  };
  contactForm.addEventListener('submit',event=>{event.preventDefault();explain();},true);
  contactForm.querySelector('.contact-send').disabled=true;
  explain();
 }else{
  const source=document.createElement('input');
  source.type='hidden';source.name='_url';source.value=location.href.split('#')[0];
  contactForm.append(source);
 }
}
