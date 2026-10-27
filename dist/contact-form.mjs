import {sendContact} from './contact-api.mjs';
const form=document.querySelector('#contact-form');
if(form && (location.protocol==='http:'||location.protocol==='https:')){
 const button=form.querySelector('button[type="submit"]');
 const label=button.querySelector('span');
 const status=form.querySelector('#contact-form-status');
 let sending=false;
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(sending)return;
  for(const name of ['name','email','subject','message'])form.elements[name].value=form.elements[name].value.trim();
  if(!form.reportValidity())return;
  if(form.elements._honey.value)return;
  const values=Object.fromEntries(new FormData(form));
  const payload={name:values.name,email:values.email,subject:values.subject,message:values.message,
   _subject:`Portafolio de Juan Torres: ${values.subject}`,_replyto:values.email,_template:'table',_honey:'',_url:location.href.split('#')[0]};
  sending=true;button.disabled=true;form.setAttribute('aria-busy','true');
  label.textContent='Enviando…';status.dataset.state='pending';status.textContent='Enviando tu mensaje…';
  try{
   const result=await sendContact(payload);
   if(result.activationRequired){
    status.dataset.state='error';
    status.textContent='Falta confirmar el correo de destino. Se ha solicitado su activación; tu mensaje se conserva para volver a enviarlo después.';
   }else{
    form.reset();status.dataset.state='success';
    status.textContent='El servicio ha recibido tu mensaje para enviarlo a Juan. ¡Gracias por escribirme!';
   }
  }catch{
   status.dataset.state='error';
   status.textContent='No se pudo confirmar el envío. Tu mensaje sigue aquí: intenta de nuevo o escríbeme a juanes.2529.delgado@gmail.com.';
  }finally{
   sending=false;button.disabled=false;form.removeAttribute('aria-busy');label.textContent='Enviar mensaje';
  }
 });
}
