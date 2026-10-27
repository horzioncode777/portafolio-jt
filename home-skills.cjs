// Verificado en manifiestos, documentación y código de los tres proyectos locales.
const projects = [
 {name:'Wireless Cooking',logo:'assets/wireless-cooking-logo.png',logoClass:'wireless',summary:'React · Express · Wompi · AWS',description:'Desarrollo Full Stack para comercio electrónico: interfaces, autenticación, pedidos, integración de pagos y despliegue.',skills:['React y Tailwind CSS','Node.js y Express','PostgreSQL','Autenticación JWT','Pagos con Wompi','AWS EC2 y RDS']},
 {name:'Piano Soulmate',logo:'assets/soulmate-logo.svg',logoClass:'soulmate',summary:'Electron · Web MIDI · Web Audio · WAV',description:'Aplicación de escritorio con entrada MIDI, motor de audio integrado, bancos de sonido, grabación y distribución para Windows.',skills:['Electron','Web MIDI API','Web Audio y AudioWorklet','Bancos de sonido','Grabación WAV','Empaquetado para Windows']},
 {name:'Trading IA',logo:'assets/trading-ia-logo.svg',logoClass:'trading',summary:'Python · SQLite · Datos en tiempo real',description:'Desarrollo en curso de herramientas para analizar datos de mercado, automatizar flujos y validar lógica de estrategias en un entorno demo.',skills:['Python y asyncio','SQLite','Streaming de datos con SSE','Visualización de cotizaciones','Automatización','Pruebas automatizadas']}
];
function learning(){return `<div class="project-learning-block"><div class="learning-heading"><span class="skill-number">APRENDIZAJES EN MIS PROYECTOS</span><p>Desarrollo web, audio digital y análisis de datos.</p></div>${projects.map(p=>`<details class="project-learning"><summary><span class="learning-icon app-logo app-logo-${p.logoClass}" aria-hidden="true"><img src="${p.logo}" alt="" loading="lazy"></span><span class="learning-label"><strong>${p.name}</strong><small>${p.summary}</small></span><b aria-hidden="true">+</b></summary><div class="learning-body"><p>${p.description}</p><div class="tags">${p.skills.map(s=>`<span>${s}</span>`).join('')}</div></div></details>`).join('')}</div>`}
function update(home){
 return home.replace(/(<section class="skills section-block" id="habilidades">)([\s\S]*?)(<\/section>)/,(_,start,body,end)=>{
  body=body.replace(/<div class="project-learning-block">[\s\S]*?<\/details><\/div>/,'');
  body=body.replace('Las herramientas con las que doy vida a cada solución.','Herramientas y aprendizajes de mis proyectos web, de audio e inteligencia artificial.');
  return start+body.replace('<a class="section-more"',learning()+'<a class="section-more"')+end;
 });
}
module.exports={update};
