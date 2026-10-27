export const CONTACT_ENDPOINT='https://formsubmit.co/ajax/juanes.2529.delgado@gmail.com';
export async function sendContact(payload,{fetchImpl=fetch,timeoutMs=25000}={}){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  const response=await fetchImpl(CONTACT_ENDPOINT,{
   method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
   body:JSON.stringify(payload),signal:controller.signal
  });
  const data=await response.json();
  const activationRequired=/activat|check.{0,30}email|confirm.{0,30}email/i.test(String(data.message||''));
  if(activationRequired)return {activationRequired:true};
  if(!response.ok || !(data.success===true||data.success==='true'))throw new Error('El servicio no confirmó el envío.');
  return {accepted:true};
 }finally{clearTimeout(timer);}
}
