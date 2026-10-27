const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const source=path.join(root,'dist');
const output=path.join(root,'vercel-public');
const pages=['index.html','sobre-mi.html','proyectos.html','habilidades.html','experiencia.html','contacto.html'];
const config=JSON.parse(fs.readFileSync(path.join(root,'deployment-config.json'),'utf8'));
const checkOnly=process.argv.includes('--check');
const downloadUrl=config.soulmateDownloadUrl;
if(downloadUrl && !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/releases\/download\/[^\s"<>]+\.exe$/.test(downloadUrl)){
 throw Error('La descarga debe apuntar al instalador publicado en GitHub Releases.');
}
if(!downloadUrl && !checkOnly){
 throw Error('Falta publicar Soulmate en GitHub Releases y guardar su enlace en deployment-config.json.');
}
const texts=fs.readdirSync(source).filter(file=>/\.(css|js|mjs)$/.test(file));
const files=new Set([...pages,...texts,'downloads/CV_Juan_Esteban_Torres_Delgado_ATS.pdf']);
for(const file of [...pages,...texts]){
 const content=fs.readFileSync(path.join(source,file),'utf8');
 for(const match of content.matchAll(/assets\/[a-zA-Z0-9_.\/-]+/g))files.add(match[0]);
}
for(const file of files){
 const resolved=path.resolve(source,file);
 if(!resolved.startsWith(source+path.sep))throw Error('Ruta fuera de dist: '+file);
 if(!fs.existsSync(resolved))throw Error('Falta un archivo del sitio: '+file);
 if(fs.statSync(resolved).size>25*1024*1024)throw Error('Archivo demasiado grande para la web: '+file);
}
if(!checkOnly){
 // A new staging folder prevents old private/unused files from surviving a build.
 fs.mkdirSync(path.join(root,'tmp'),{recursive:true});
 const staging=fs.mkdtempSync(path.join(root,'tmp','vercel-stage-'));
 for(const file of files){
  const destination=path.join(staging,file);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  if(pages.includes(file)){
   const html=fs.readFileSync(path.join(source,file),'utf8').replaceAll('href="downloads/Soulmate-Setup-0.6.0.exe"',`href="${downloadUrl}"`);
   fs.writeFileSync(destination,html);
  }else fs.copyFileSync(path.join(source,file),destination);
 }
 // Keep the previous output recoverable rather than recursively deleting it.
 if(fs.existsSync(output))fs.renameSync(output,path.join(root,'tmp','vercel-previous-'+Date.now()));
 fs.renameSync(staging,output);
}
const bytes=[...files].reduce((sum,file)=>sum+fs.statSync(path.join(source,file)).size,0);
console.log(`${files.size} archivos web verificados; ${(bytes/1024/1024).toFixed(1)} MiB. Instalador excluido.`);
if(checkOnly&&!downloadUrl)console.log('Pendiente: enlace real de GitHub Releases para poder publicar.');
