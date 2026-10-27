// Local, reversible translations: no translation service, URL change or page reload.
(() => {
 const english=window.portfolioEnglish||{};
 const reverse=new Map(Object.entries(english).map(([es,en])=>[en,es]));
 const textState=new WeakMap(),attributeState=new WeakMap();
 const button=document.querySelector('.language-toggle');
 if(!button)return;
 const storageKey='jt-portfolio-language';
 let language='es',hasRendered=false;
 try{if(localStorage.getItem(storageKey)==='en')language='en';}catch{}
 const attrs=['aria-label','aria-roledescription','title','placeholder','alt'];
 function translate(value){
  if(english[value])return english[value];
  const image=value.match(/^Ampliar imagen (\d+) de (\d+): (.+)$/);
  if(image)return `Enlarge image ${image[1]} of ${image[2]}: ${translate(image[3])}`;
  return value;
 }
 function convert(value,state,context){
  // Capture changes made by the menu, carousel and form without losing the Spanish source.
  if(!state||value!==state.last)state={source:hasRendered&&language==='en'?(reverse.get(value)||value):value,last:value};
  const source=state.source,trimmed=source.trim();
  let translated=translate(trimmed);
  if(context?.closest('#proyectos h2')){
   if(trimmed==='Proyectos')translated='Featured';
   if(trimmed==='destacados')translated='projects';
  }
  const next=language==='en'&&trimmed?source.replace(trimmed,()=>translated):source;
  return {source,last:next};
 }
 const status=document.createElement('span');status.className='language-live';status.setAttribute('role','status');status.setAttribute('aria-live','polite');document.body.append(status);
 const links=new Map([...document.querySelectorAll('a[href^="mailto:"],a[href^="https://wa.me/"]')].map(link=>[link,link.getAttribute('href')]));
 const drafts={
  'Conversemos - Portafolio de Juan Torres':"Let’s talk - Juan Torres’ portfolio",
  'Oportunidad laboral - Portafolio de Juan Torres':"Job opportunity - Juan Torres’ portfolio",
  'Hola, Juan.\n\nTe escribo de parte de [empresa] por una oportunidad como [rol].\n\nEquipo o proyecto:\nTecnologías principales:\nModalidad de trabajo:\nPróximos pasos:\n\nSaludos,':'Hi Juan,\n\nI am contacting you on behalf of [company] about an opportunity as [role].\n\nTeam or project:\nMain technologies:\nWork arrangement:\nNext steps:\n\nBest regards,',
  'Hola, Juan. Vi tu portafolio y me gustaría coordinar una entrevista.':'Hi Juan, I saw your portfolio and would like to arrange an interview.',
  'Hola, Juan. Vi tu portafolio y quisiera conocer más sobre tu experiencia técnica y tus proyectos.':'Hi Juan, I saw your portfolio and would like to learn more about your technical experience and projects.'
 };
 function updateLinks(){
  for(const [link,original] of links){
   if(language==='es'){link.setAttribute('href',original);continue;}
   const url=new URL(original,location.href);
   for(const key of ['subject','body','text']){const value=url.searchParams.get(key);if(drafts[value])url.searchParams.set(key,drafts[value]);}
   link.setAttribute('href',url.href);
  }
 }
 function render(announce=false){
  observer.disconnect();
  document.documentElement.lang=language;
  const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,.language-toggle,.language-live,[translate="no"]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
  for(let node;node=walker.nextNode();){const state=convert(node.nodeValue,textState.get(node),node.parentElement);if(node.nodeValue!==state.last)node.nodeValue=state.last;textState.set(node,state);}
  for(const el of document.querySelectorAll('[aria-label],[aria-roledescription],[title],[placeholder],[alt],meta[name="description"]')){
   if(el.closest('.language-toggle,[translate="no"]'))continue;
   const states=attributeState.get(el)||new Map();
   for(const attr of el.matches('meta[name="description"]')?['content']:attrs){if(!el.hasAttribute(attr))continue;const state=convert(el.getAttribute(attr),states.get(attr));if(el.getAttribute(attr)!==state.last)el.setAttribute(attr,state.last);states.set(attr,state);}
   attributeState.set(el,states);
  }
  const isEnglish=language==='en';
  button.querySelector('.language-flag-es').hidden=isEnglish;
  button.querySelector('.language-flag-en').hidden=!isEnglish;
  button.querySelector('.language-code').textContent=isEnglish?'EN':'ES';
  button.setAttribute('aria-label',isEnglish?'Switch to Spanish':'Cambiar a inglés');button.title=isEnglish?'Switch to Spanish':'Cambiar a inglés';button.setAttribute('aria-pressed',String(isEnglish));
  updateLinks();hasRendered=true;
  if(announce)status.textContent=isEnglish?'Language changed to English.':'Idioma cambiado a español.';
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:[...attrs,'content']});
 }
 const observer=new MutationObserver(()=>render());
 button.addEventListener('click',()=>{language=language==='es'?'en':'es';try{localStorage.setItem(storageKey,language);}catch{}render(true);document.dispatchEvent(new CustomEvent('portfolio-language-change',{detail:{language}}));});
 window.addEventListener('storage',event=>{if(event.key===storageKey){language=event.newValue==='en'?'en':'es';render();}});
 render();
})();
