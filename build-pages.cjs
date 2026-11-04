const fs = require('node:fs');
const path = require('node:path');
const project = __dirname;
const {soulmateDownloadUrl} = require('./deployment-config.json');
if(!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/releases\/download\/[^\s"<>]+\.exe$/.test(soulmateDownloadUrl))throw Error('Falta un enlace válido de GitHub Releases para Soulmate.');
const output = path.join(project,'dist');
fs.mkdirSync(path.join(project,'tmp'),{recursive:true});
const staging = fs.mkdtempSync(path.join(project,'tmp','build-'));
fs.cpSync(path.join(project,'src/public'),staging,{recursive:true});
fs.copyFileSync(path.join(project,'src/templates/index.html'),path.join(staging,'index.html'));
const root = staging + path.sep;
fs.mkdirSync(root+'downloads',{recursive:true});
fs.copyFileSync(path.join(project,'src/downloads/CV_Juan_Esteban_Torres_Delgado_ATS.pdf'),root+'downloads/CV_Juan_Esteban_Torres_Delgado_ATS.pdf');
const pages = [ ['index','Inicio'],['sobre-mi','Sobre mí'],['proyectos','Proyectos'],['habilidades','Habilidades'],['experiencia','Experiencia'],['contacto','Contacto'] ];
function header(active){return `<header class="nav-shell"><a class="logo" href="index.html" aria-label="Juan Torres, inicio"><img src="assets/jt-brand-logo.png" alt="Juan Esteban Torres Delgado · Desarrollador Full Stack" width="1535" height="1024"></a><nav id="main-navigation" aria-label="Navegación principal">${pages.map(([slug,name])=>`<a href="${slug}.html"${slug===active?' class="active" aria-current="page"':''}>${name}</a>`).join('')}</nav><a class="cv-link" href="cv.html" target="_blank" rel="noopener">Ver CV <span>↗</span></a><button class="menu-toggle" aria-label="Abrir menú" aria-controls="main-navigation" aria-expanded="false">☰</button></header>`}
function footer(){return `<footer><a class="logo" href="index.html" aria-label="Volver al inicio"><img src="assets/jt-brand-logo.png" alt="Juan Esteban Torres Delgado · Desarrollador Full Stack" width="1535" height="1024"></a><p>Juan Esteban Torres Delgado <span>·</span> Desarrollo Full Stack</p><a href="#contenido">Volver arriba ↑</a></footer>`}
function tags(items){return `<div class="tags">${items.map(item=>`<span>${item}</span>`).join('')}</div>`}
function panel(label,title,body){return `<article class="detail-panel"><div class="kicker">${label}</div><h2>${title}</h2>${body}</article>`}
function link(url,text){return `<a class="text-link" href="${url}">${text} <span>↗</span></a>`}
const content = require('./src/content/pages.cjs')({panel,tags,link});
require('./src/content/page-content.cjs')(content, {panel, tags, link});
const projectCatalog = require('./src/content/project-catalog.cjs');
projectCatalog.enrich(content.proyectos);
const contactDesign=require('./src/content/contact-design.cjs');
contactDesign.enrich(content.contacto);
for(const [slug,page] of Object.entries(content)){
 const title = pages.find(p=>p[0]===slug)[1];
 fs.writeFileSync(root+slug+'.html',`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080b1a"><meta name="description" content="${page.intro}"><title>${title} — Juan Torres</title><link rel="stylesheet" href="styles.css?v=3"><link rel="stylesheet" href="pages.css?v=1"><link rel="stylesheet" href="gallery.css?v=2">${slug==='habilidades'?'<link rel="stylesheet" href="skills.css?v=2">':''}${slug==='experiencia'?'<link rel="stylesheet" href="experience.css?v=2">':''}${slug==='contacto'?'<link rel="stylesheet" href="contact-form.css?v=2">':''}<link rel="icon" href="assets/jt-brand-favicon.svg?v=1" type="image/svg+xml"></head><body class="inner-page"><a class="skip" href="#contenido">Ir al contenido</a>${header(slug)}<main id="contenido" class="detail-wrap"><div class="breadcrumb"><a href="index.html">Inicio</a><span>/</span><span aria-current="page">${title}</span></div><section class="page-intro">${page.label ? `<div class="kicker">${page.label}</div>` : ''}<h1>${page.title}</h1>${page.intro ? `<p>${page.intro}</p>` : ''}</section>${page.body}<nav class="page-navigation" aria-label="Explorar el portafolio">${pages.filter(p=>p[0]!==slug).map(([s,n])=>`<a href="${s}.html">${n} ↗</a>`).join('')}</nav></main>${footer()}<script src="app.js?v=3"></script><script src="gallery.js?v=2"></script>${slug==='habilidades'?'<script src="skills.js?v=1"></script>':''}${slug==='contacto'?'<script src="contact-origin.js?v=1"></script><script type="module" src="contact-form.mjs?v=3"></script>':''}</body></html>`);
 if(slug==='contacto'){
  const file=root+slug+'.html';
  fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace(/<nav class="page-navigation"[\s\S]*?<\/nav>/,''));
 }
}
let home=fs.readFileSync(root+'index.html','utf8');
home=home.replace(/<section id="proyectos"[\s\S]*?<\/section>/,projectCatalog.featured());
home=home.replace(/<section id="proyectos-en-curso"[\s\S]*?<\/section>\s*/,'');
home=home.replace('<section class="skills section-block"',projectCatalog.ongoing()+'\n<section class="skills section-block"');
home=home.replace(/<header class="nav-shell">[\s\S]*?<\/header>/,header('index'));
home=home.replace(/<dialog[\s\S]*?<\/dialog>/,'');
home=home.replace(/<button class="project-card" data-project="(\d)">([\s\S]*?)<\/button>/g,(_,n,body)=>`<a class="project-card" href="proyectos.html#${['plataforma','administracion','scorm'][n]}">${body}</a>`);
home=home.replace('styles.css?v=2','styles.css?v=3');
if(!home.includes('pages.css'))home=home.replace('</head>','<link rel="stylesheet" href="pages.css?v=1"></head>');
home=home.replace('href="#proyectos"><span aria-hidden','href="proyectos.html"><span aria-hidden').replace('href="#contacto">Hablemos','href="contacto.html">Hablemos');
for(const [slug,label] of pages.slice(1)){
 const sectionPattern=new RegExp(`(<section[^>]*id="${slug}"[^>]*>)([\\s\\S]*?)(</section>)`);
 if(!home.includes(`class="section-more" href="${slug}.html"`))home=home.replace(sectionPattern,(_,start,body,end)=>`${start}${body}<a class="section-more" href="${slug}.html">${{'sobre-mi':'Más sobre mí',proyectos:'Explorar proyectos en detalle',habilidades:'Conocer mi stack',experiencia:'Ver trayectoria completa',contacto:'Ver opciones de contacto'}[slug]} <span>↗</span></a>${end}`);
}
home=home.replace('src="app.js"','src="app.js?v=3"');
home=require('./src/content/home-skills.cjs').update(home);
home=require('./src/content/home-education.cjs').update(home);
home=contactDesign.updateHome(home);
home=home.replace('<span>CONOCE AL DESARROLLADOR</span>','');
home=home.replaceAll('J<span>T</span><i>.</i>','<img src="assets/jt-brand-logo.png" alt="Juan Esteban Torres Delgado · Desarrollador Full Stack" width="1535" height="1024">');
fs.writeFileSync(root+'index.html',home.replace(/\n{3,}/g,'\n\n'));
for(const name of fs.readdirSync(root).filter(name=>name.endsWith('.html'))){
 const path=root+name;
 const html=contactDesign.removeNumbering(fs.readFileSync(path,'utf8')).replaceAll('CV-Juan-Delgado.pdf','CV_Juan_Esteban_Torres_Delgado_ATS.pdf');
 const updated=html.replaceAll('src="assets/jt-portfolio-logo.png" alt="JT Portfolio · Full Stack Developer" width="1280" height="1280"','src="assets/jt-brand-logo.png" alt="Juan Esteban Torres Delgado · Desarrollador Full Stack" width="1535" height="1024"').replaceAll('href="assets/favicon.svg"','href="assets/jt-brand-favicon.svg?v=1"').replace(/<a\b[^>]*href="cv.html"[^>]*>[\s\S]*?<\/a>/g,anchor=>anchor
  .replace('href="cv.html"','href="downloads/CV_Juan_Esteban_Torres_Delgado_ATS.pdf" download="CV_Juan_Esteban_Torres_Delgado_ATS.pdf"')
  .replace(/ target="[^"]*"/g,'').replace(/ rel="[^"]*"/g,'')
  .replace(/Ver (?:mi )?hoja de vida/g,'Descargar hoja de vida')
  .replace(/Ver CV(?: completo)?/g,'Descargar CV')
  .replace(/<span(?: aria-hidden="true")?>↗<\/span>/g,'<span aria-hidden="true">↓</span>'));
 fs.writeFileSync(path,require('./src/content/language-switch.cjs')(updated).replaceAll('href="downloads/Soulmate-Setup-0.6.0.exe"',`href="${soulmateDownloadUrl}"`));
}
if(fs.existsSync(output))fs.renameSync(output,path.join(project,'tmp','dist-previous-'+Date.now()));
fs.renameSync(staging,output);
console.log('Sitio construido en dist/.');
