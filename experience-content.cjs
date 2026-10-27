module.exports=function experience(page,{tags}){
 const paths={
  building:'<path d="m3 10 13-7 13 7H3Zm3 4v12m7-12v12m6-12v12m7-12v12M3 29h26"/>',
  data:'<ellipse cx="16" cy="7" rx="11" ry="4"/><path d="M5 7v9c0 5 22 5 22 0V7M5 16v9c0 5 22 5 22 0v-9"/>',
  book:'<path d="M16 8C11 4 5 4 3 5v22c4-2 9-1 13 2 4-3 9-4 13-2V5c-3-1-8-1-13 3Zm0 0v21M8 11l4 1m-4 5 4 1m8-6 4-1m-4 7 4-1"/>',
  layout:'<rect x="3" y="4" width="26" height="24" rx="4"/><path d="M3 11h26M11 11v17m5-11h8m-8 5h5"/>',
  devices:'<rect x="3" y="5" width="21" height="16" rx="3"/><path d="M7 27h13m-6-6v6"/><rect x="22" y="14" width="8" height="15" rx="2"/>',
  chart:'<path d="M4 4v24h24M9 22v-5m7 5V9m7 13V4"/>',
  cap:'<path d="m2 12 14-7 14 7-14 7-14-7Zm6 4v8c4 4 12 4 16 0v-8M29 13v11"/>'
 };
 const icon=name=>`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
 const responsibilities=[
  ['data','Backend y datos','Desarrollo con Node.js y PostgreSQL e implementación de módulos para gestionar usuarios y cursos.'],
  ['book','Contenido educativo','Integración de carga y reproducción de paquetes SCORM de hasta 6 GB dentro de la plataforma.'],
  ['layout','Administración de contenidos','Diseño de una interfaz para administrar noticias, cursos y otros contenidos educativos.'],
  ['devices','Frontend responsivo','Construcción de interfaces dinámicas y adaptables a distintos dispositivos, conectadas con los servicios del backend.'],
  ['chart','Analítica de uso y progreso','Aplicación de analítica de datos para observar la actividad y el avance de los usuarios en la plataforma.']
 ];
 const courses=[
  {title:'Análisis de datos',provider:'LinkedIn',duration:'2 horas',symbol:'chart'},
  {title:'Desarrollo de Python avanzado',provider:'Netzum',duration:'1 h 42 min',symbol:'data'},
  {title:'Máster en colecciones y estructuras de datos en Java',provider:'LinkedIn',duration:'8 horas',symbol:'data'},
  {title:'Arquitectura de aplicaciones empresariales con .NET 7',provider:'LinkedIn',duration:'19 horas',symbol:'layout'},
  {title:'Desarrollo Android: Jetpack esencial',provider:'LinkedIn Learning',duration:'2 h 15 min',symbol:'devices'}
 ];
 page.label='EXPERIENCIA Y FORMACIÓN';
 page.title='Aprender. Construir. <span>Seguir creciendo.</span>';
 page.intro='Mi trayectoria reúne formación en Ingeniería de Software y experiencia Full Stack en soluciones educativas para la Alcaldía de Cajicá.';
 page.body=`<div class="career-layout"><article class="career-role"><header class="career-role-header"><div class="career-institution"><span class="career-emblem">${icon('building')}</span><div><span class="career-eyebrow">EXPERIENCIA PROFESIONAL</span><h2>Alcaldía de Cajicá</h2><p>Desarrollador Full Stack</p></div></div><span class="career-period">2025 — 2026</span></header><div class="career-role-content"><div class="career-context"><div><div class="kicker">DESARROLLO CON PROPÓSITO</div><h3>Una plataforma para aprender y gestionar.</h3><p>Participé en el desarrollo de soluciones que conectan frontend, backend y bases de datos para una plataforma educativa y sus herramientas de administración.</p><p>Mi trabajo abarcó la gestión de usuarios y cursos, la integración de contenidos de aprendizaje y las interfaces que permiten administrar la información.</p></div><figure class="career-preview"><img src="assets/alcaldia-cajica-app.png" alt="Interfaz de gestión de cursos de la Alcaldía de Cajicá" width="1861" height="925" loading="lazy"><figcaption>Plataforma educativa · Gestión de cursos</figcaption></figure></div><div class="career-toolkit"><span>TECNOLOGÍAS Y ÁREAS</span>${tags(['Node.js','PostgreSQL','Full Stack','APIs REST','SCORM','Analítica de datos'])}</div><div class="career-responsibility-heading"><h3>Mi trabajo en la plataforma</h3><span>De la interfaz a los datos</span></div><div class="career-responsibilities">${responsibilities.map(([symbol,title,text])=>`<section class="career-responsibility"><span class="career-task-icon">${icon(symbol)}</span><div><h4>${title}</h4><p>${text}</p></div></section>`).join('')}</div></div></article><aside class="career-sidebar"><section class="career-education"><div class="career-sidebar-title"><span class="career-emblem">${icon('cap')}</span><div><span class="career-eyebrow">MI FORMACIÓN</span><h2>El camino académico</h2></div></div><ol class="career-study-timeline"><li><span class="career-study-date">2022 — 2026</span><span class="career-study-status">En formación</span><h3>Ingeniería de Software</h3><p class="career-school">Universidad Manuela Beltrán</p><p>Estudiante de décimo semestre.</p></li><li><span class="career-study-date">2021</span><h3>Formación escolar</h3><p class="career-school">Colegio Emilio Sotomayor Luque</p></li></ol></section><section class="career-education career-courses"><div class="career-sidebar-title"><span class="career-emblem">${icon('book')}</span><div><span class="career-eyebrow">FORMACIÓN COMPLEMENTARIA</span><h2>Aprendizaje adicional</h2></div></div><ul class="career-course-list">${courses.map(course=>`<li><div><h3>${course.title}</h3><div class="career-course-meta"><span>${course.provider}</span><span>${course.duration}</span></div></div></li>`).join('')}</ul></section><div class="career-sidebar-footer"><dl aria-label="Idiomas"><div><dt>Español</dt><dd>Nativo</dd></div><div><dt>Inglés</dt><dd>B2</dd></div></dl><a href="cv.html" target="_blank" rel="noopener">Ver hoja de vida <span aria-hidden="true">↗</span></a></div></aside></div><div class="page-cta career-next"><div><div class="kicker">EL SIGUIENTE PASO</div><h2>Construir junto a un buen equipo.</h2><p>Busco aportar mi experiencia Full Stack, seguir aprendiendo y dar vida a nuevas soluciones.</p></div><a class="button primary" href="contacto.html">Conversemos ↗</a></div>`;
};
