// Formación indicada en la hoja de vida del usuario.
function update(home){
 return home.replace(/(<section class="experience section-block" id="experiencia">)([\s\S]*?)(<\/section>)/,(_,start,body,end)=>{
  body=body.replace(/<article><span class="timeline-dot"><\/span><div class="timeline-meta">2022 — 2026[\s\S]*?<\/article>/,'');
  body=body.replace(/<div class="home-education">[\s\S]*?<\/article><\/div>/,'');
  const studies=`<div class="home-education"><div class="education-heading"><span class="kicker">MIS ESTUDIOS</span><h3>Formación académica</h3></div><article class="study-card university-study"><div class="study-topline"><span>2022 — 2026</span><span class="study-status">En formación</span></div><h4>Ingeniería de Software</h4><p class="study-institution">Universidad Manuela Beltrán</p><p>Estudiante de décimo semestre. Formación y conocimientos en desarrollo de software, programación orientada a objetos, bases de datos y patrones de diseño.</p><div class="tags"><span>Décimo semestre</span><span>Ingeniería de Software</span></div></article><article class="study-card school-study"><div class="study-topline"><span>2021</span><span class="study-category">FORMACIÓN ESCOLAR</span></div><h4>Colegio Emilio Sotomayor Luque</h4><p>Educación previa a mis estudios universitarios.</p></article></div>`;
  return start+body.replace('<a class="section-more"',studies+'<a class="section-more"')+end;
 });
}
module.exports={update};
