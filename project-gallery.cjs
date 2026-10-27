const municipal = [
 ['assets/alcaldia-cajica-app.png','Administración de cursos y contenidos'],
 ['assets/alcaldia-gallery/04.png','Inicio · Formación en SENATIC'],
 ['assets/alcaldia-gallery/05.png','Inicio · Formación gratuita en Avanza Tech'],
 ['assets/alcaldia-gallery/06.png','Acceso a la plataforma educativa'],
 ['assets/alcaldia-gallery/03.png','Registro de una cuenta'],
 ['assets/alcaldia-gallery/01.png','Perfil del estudiante y actividad reciente'],
 ['assets/alcaldia-gallery/07.png','Panel de progreso y horas de estudio'],
 ['assets/alcaldia-gallery/08.png','Catálogo de cursos disponibles'],
 ['assets/alcaldia-gallery/02.png','Reproducción del curso y seguimiento por módulos'],
 ['assets/alcaldia-gallery/09.png','Curso de inteligencia artificial y avance por lección'],
 ['assets/alcaldia-gallery/10.png','Continuar una formación desde el último avance'],
 ['assets/alcaldia-gallery/11.png','Cierre de sesión por seguridad']
];
const wireless = [
 ['assets/wireless-cooking-app.png','Catálogo de productos de cocina'],
 ['assets/wireless-gallery/01.png','Inicio · Tiendas de la Sabana y productos destacados'],
 ['assets/wireless-gallery/02.png','Búsqueda, filtros y disponibilidad de productos'],
 ['assets/wireless-gallery/03.png','Directorio de tiendas y búsqueda por municipio'],
 ['assets/wireless-gallery/04.png','Asistente de compras integrado'],
 ['assets/wireless-gallery/05.png','Conversación con el asistente sobre las entregas'],
 ['assets/wireless-gallery/06.png','Panel del vendedor, inventario y avisos de pedidos'],
 ['assets/wireless-gallery/07.png','Carrito de compras y resumen del pedido'],
 ['assets/wireless-gallery/08.png','Mi cuenta e historial de pedidos'],
 ['assets/wireless-gallery/09.png','Checkout · Entrega y métodos de pago']
];
const piano = [
 ['assets/soulmate-app.png','Instrumento · Biblioteca de pianos y teclado'],
 ['assets/piano-gallery/01.png','Sonido · Color, transposición y bancos de instrumentos'],
 ['assets/piano-gallery/02.png','Sala · Perfiles de acústica y ambiente'],
 ['assets/piano-gallery/03.png','Efectos · Reverberación, compresor, ecualizador y chorus'],
 ['assets/piano-gallery/04.png','Ajustes · Conexiones MIDI y salida de audio']
];
const trading = [
 ['assets/trading-ia-app.png','Terminal de Trading IA · Vista general en cuenta demo'],
 ['assets/trading-gallery/01.png','Seguimiento de mercados y panel del motor de análisis'],
 ['assets/trading-gallery/02.png','Explorador de activos, búsqueda y favoritos'],
 ['assets/trading-gallery/03.png','Historial de operaciones en cuenta demo'],
 ['assets/trading-gallery/04.png','Actividad del mercado y métricas de operaciones demo'],
 ['assets/trading-gallery/05.png','Gráfico de velas y estado de verificación del activo']
];
function gallery(project){
 const images=project.id==='contexto'?municipal:project.id==='grado'?wireless:project.id==='piano'?piano:project.id==='trading-ia'?trading:[[project.image,project.alt]];
 const multiple=images.length>1;
 return `<div class="project-gallery" role="region" aria-roledescription="carrusel" aria-label="Capturas de ${project.name}" data-gallery-name="${project.name}"><div class="gallery-stage"><div class="gallery-track">${images.map(([src,caption],i)=>`<button class="gallery-slide gallery-open" type="button" aria-label="Ampliar imagen ${i+1} de ${images.length}: ${caption}" data-caption="${caption}"${i?' tabindex="-1"':''}><img src="${src}" alt="${caption}" loading="lazy" draggable="false"></button>`).join('')}</div>${multiple?'<button class="gallery-arrow gallery-prev" type="button" aria-label="Imagen anterior">‹</button><button class="gallery-arrow gallery-next" type="button" aria-label="Imagen siguiente">›</button>':''}<span class="gallery-zoom" aria-hidden="true">⤢</span></div><div class="gallery-meta"><span class="gallery-caption">${images[0][1]}</span><span class="gallery-count" role="status" aria-live="polite">1 / ${images.length}</span></div>${multiple?'<div class="gallery-progress" aria-hidden="true"><span></span></div>':''}</div>`;
}
module.exports={gallery};
