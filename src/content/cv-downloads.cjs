const files=['Juan-Esteban-Torres-Delgado-CV-ES.pdf','Juan-Esteban-Torres-Delgado-CV-EN.pdf'];
function enhance(html){
 html=html.replace(/<link rel="stylesheet" href="cv-downloads\.css[^"\s]*">/g,'').replace(/<script src="cv-downloads\.js[^"\s]*" defer><\/script>/g,'');
 html=html.replace(/<a\b[^>]*href="downloads\/(?:CV_Juan_Esteban_Torres_Delgado_ATS|Juan-Esteban-Torres-Delgado-CV-ES)\.pdf"[^>]*>/g,tag=>tag
  .replace(/href="[^"]*"/,`href="downloads/${files[0]}"`)
  .replace(/\s(?:download|data-cv-download|data-cv-en|aria-label|title)(?:="[^"]*")?/g,'')
  .replace(/>$/,` download="${files[0]}" data-cv-download data-cv-en="${files[1]}" aria-label="Descargar CV en español e inglés" title="Dos PDF: español e inglés">`));
 return html.replace('</head>','<link rel="stylesheet" href="cv-downloads.css?v=1"><script src="cv-downloads.js?v=2" defer></script></head>');
}
enhance.files=files;
module.exports=enhance;
