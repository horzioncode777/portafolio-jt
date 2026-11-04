# Juan Torres · Portafolio

[Ver portafolio](https://portafolio-jt.vercel.app/) · [Proyectos](https://portafolio-jt.vercel.app/proyectos) · [Comprobaciones](https://github.com/horzioncode777/portafolio-jt/actions/workflows/check.yml)

![Inicio del portafolio de Juan Torres](dist/assets/portafolio-preview.jpg)

Mi portafolio reúne experiencia en desarrollo Full Stack, formación y proyectos web, de escritorio y audio digital.

## Qué incluye

- Páginas de inicio, perfil, proyectos, habilidades, experiencia y contacto.
- Diseño adaptable a móvil y escritorio, con navegación por teclado.
- Selector de español e inglés que conserva el idioma elegido.
- Galerías de proyectos con controles, gestos y vista ampliada.
- Descarga del CV y del instalador de Piano Soulmate desde GitHub Releases.
- Formulario de contacto con FormSubmit, validación y estados de envío.

## Tecnologías

El sitio usa HTML, CSS y JavaScript, sin framework ni dependencias npm. Los scripts de Node.js generan las páginas y preparan la publicación en Vercel. Python sirve para la vista previa y la comprobación de enlaces.

Las tecnologías descritas dentro de los proyectos, como React, Express o PostgreSQL, pertenecen a esos trabajos; no son dependencias de este portafolio.

## Requisitos

| Herramienta | Versión de trabajo | Uso |
| --- | --- | --- |
| Node.js | 22.x | Construcción y comprobación de sintaxis |
| Python | 3.12.x | Vista previa y verificación del sitio |
| Git | 2.x | Clonar el repositorio y revisar cambios |

Las versiones están indicadas en `.nvmrc` y `.python-version`. No hace falta ejecutar `npm install` ni instalar paquetes de Python.

## Ejecutar en local

```sh
git clone https://github.com/horzioncode777/portafolio-jt.git
cd portafolio-jt
node build-pages.cjs
python preview.py --serve
```

Abre [http://127.0.0.1:4173/](http://127.0.0.1:4173/). En Windows también puedes usar `Abrir portafolio.cmd` después de construir el sitio. Para detener el servidor, pulsa `Ctrl+C`.

Usa el servidor local para probar el formulario; abrir el HTML directamente con `file://` no permite enviar mensajes. El envío depende de que la dirección de destino esté activada en FormSubmit.

## Estructura

```text
.github/workflows/check.yml  Comprobaciones en GitHub Actions
scripts/check_site.py       Verificación de sintaxis, archivos y enlaces
tests/                      Pruebas del verificador
dist/                       HTML, estilos, scripts, imágenes, captura y CV del sitio
source-assets/              CV original que se copia al construir
release-notes/              Notas de las versiones de Piano Soulmate
build-pages.cjs             Construcción de páginas y actualización del inicio
page-content.cjs            Contenido de las páginas interiores
project-catalog.cjs         Proyectos, funcionalidades y contribuciones
project-gallery.cjs         Imágenes y leyendas de las galerías
home-education.cjs          Formación que aparece en el inicio
home-skills.cjs             Habilidades que aparecen en el inicio
experience-content.cjs      Experiencia y formación
skills-content.cjs          Contenido de habilidades
contact-page.cjs            Contenido y campos de contacto
contact-design.cjs          Presentación de la sección de contacto
language-switch.cjs         Inserción del selector de idioma
deployment-config.json     Enlace del instalador de Piano Soulmate
prepare-vercel.cjs          Preparación del directorio de publicación
preview.py                  Servidor local
vercel.json                 Configuración de Vercel
```

`dist/` está versionado y contiene recursos que también utiliza la construcción. No borres esa carpeta ni la trates como una salida descartable. `vercel-public/` es la salida de publicación y se excluye de Git.

## Actualizar contenido

| Cambio | Archivo |
| --- | --- |
| Presentación y contenido base del inicio | `dist/index.html` |
| Textos de páginas interiores | `page-content.cjs` y `build-pages.cjs` |
| Formación y experiencia | `home-education.cjs` y `experience-content.cjs` |
| Habilidades | `home-skills.cjs` y `skills-content.cjs` |
| Proyectos, tecnologías, funcionalidades y contribución | `project-catalog.cjs` |
| Capturas y leyendas de los proyectos | `project-gallery.cjs` y `dist/assets/` |
| Datos y formulario de contacto | `contact-page.cjs`, `contact-design.cjs` y `dist/contact-api.mjs` |
| Traducciones al inglés | `dist/i18n-en.js` |
| Estilos y comportamiento | Archivos `.css`, `.js` y `.mjs` de `dist/` |

Después de editar, ejecuta `node build-pages.cjs` y revisa el resultado en local. Parte del contenido de las páginas interiores se reemplaza durante la construcción: modifica sus módulos de contenido, no solo el HTML generado. Si cambias textos en español, actualiza también su traducción en `dist/i18n-en.js`.

Para reemplazar el CV, actualiza `source-assets/CV_Juan_Esteban_Torres_Delgado_ATS.pdf` y vuelve a construir. Para añadir imágenes, guárdalas en `dist/assets/`, usa nombres sin espacios y actualiza las rutas, dimensiones y textos alternativos correspondientes.

Para publicar una nueva versión de Piano Soulmate, crea su GitHub Release y actualiza `soulmateDownloadUrl` en `deployment-config.json`. El instalador se distribuye desde Releases y no se incluye en los archivos web.

## Comprobar cambios

```sh
python -m unittest discover -s tests
python scripts/check_site.py --syntax
node build-pages.cjs
node prepare-vercel.cjs
python scripts/check_site.py vercel-public
```

GitHub Actions ejecuta estos pasos en cada push a `main` y en cada pull request. Comprueba la sintaxis JavaScript, la construcción, las seis páginas, los recursos locales, los identificadores repetidos y los enlaces internos con sus anclas. También comprueba las imágenes de CSS y los imports locales de módulos JavaScript.

Las comprobaciones no envían formularios ni consultan servicios externos. La recepción del correo, los enlaces de otros sitios y el funcionamiento visual se revisan aparte.

## Publicar en Vercel

El proyecto de Vercel está conectado a la rama `main` de este repositorio. La configuración está en `vercel.json`:

```sh
node build-pages.cjs && node prepare-vercel.cjs
```

El directorio de salida es `vercel-public/`. Se publican las páginas con rutas como `/proyectos` y `/experiencia`, junto con sus recursos y el CV. Las carpetas de trabajo y el instalador de escritorio quedan fuera del despliegue.
