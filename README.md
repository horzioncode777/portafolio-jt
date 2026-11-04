# Juan Torres · Portafolio

[Ver portafolio](https://portafolio-jt.vercel.app/) · [Proyectos](https://portafolio-jt.vercel.app/proyectos) · [Comprobaciones](https://github.com/horzioncode777/portafolio-jt/actions/workflows/check.yml)

![Inicio del portafolio de Juan Torres](docs/portafolio-preview.jpg)

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
src/
  templates/index.html      Plantilla de la página de inicio
  content/                  Textos y composición de las páginas
  public/                   Estilos y scripts del navegador
    assets/                 Imágenes, logotipos y galerías
  downloads/                CV original
scripts/check_site.py       Verificación de sintaxis, recursos y enlaces
tests/                      Pruebas del sitio y del verificador
docs/                       Capturas para GitHub y vista previa social
release-notes/              Versiones de Piano Soulmate
build-pages.cjs             Construcción de src/ a dist/
prepare-vercel.cjs          Preparación de la publicación en Vercel
deployment-config.json     Enlace del instalador de Piano Soulmate
preview.py                  Servidor local de dist/
vercel.json                 Configuración de Vercel
.github/workflows/          Comprobaciones automáticas
.nvmrc                      Versión de Node.js
.python-version             Versión de Python
LICENSE                     Derechos de uso
```

`src/` contiene las fuentes. Cada construcción genera `dist/` desde cero, sin modificar `src/` ni leer salidas anteriores. `vercel-public/` contiene únicamente los archivos que se publican en Vercel. Ambas carpetas de salida se excluyen de Git.

## Actualizar contenido

| Cambio | Archivo |
| --- | --- |
| Presentación y contenido base del inicio | `src/templates/index.html` |
| Textos de páginas interiores | `src/content/page-content.cjs` y `src/content/pages.cjs` |
| Formación y experiencia | `src/content/home-education.cjs` y `src/content/experience-content.cjs` |
| Habilidades | `src/content/home-skills.cjs` y `src/content/skills-content.cjs` |
| Proyectos, tecnologías, funcionalidades y contribución | `src/content/project-catalog.cjs` |
| Capturas y leyendas de los proyectos | `src/content/project-gallery.cjs` y `src/public/assets/` |
| Datos y formulario de contacto | `src/content/contact-page.cjs`, `src/content/contact-design.cjs` y `src/public/contact-api.mjs` |
| Traducciones al inglés | `src/public/i18n-en.js` |
| Estilos y comportamiento | Archivos `.css`, `.js` y `.mjs` de `src/public/` |

Después de editar, ejecuta `node build-pages.cjs` y revisa el resultado en local. Edita las plantillas y los módulos de `src/`; los cambios hechos directamente en `dist/` se reemplazan al construir. Si cambias textos en español, actualiza también su traducción en `src/public/i18n-en.js`.

Para reemplazar el CV, actualiza `src/downloads/CV_Juan_Esteban_Torres_Delgado_ATS.pdf` y vuelve a construir. Para añadir imágenes, guárdalas en `src/public/assets/`, usa nombres sin espacios y actualiza las rutas, dimensiones y textos alternativos correspondientes.

Para publicar una nueva versión de Piano Soulmate, crea su GitHub Release y actualiza `soulmateDownloadUrl` en `deployment-config.json`. El instalador se distribuye desde Releases y no se incluye en los archivos web.

## Comprobar cambios

```sh
python -m unittest discover -s tests
python scripts/check_site.py --syntax
node build-pages.cjs
node prepare-vercel.cjs
python scripts/check_site.py vercel-public
```

GitHub Actions ejecuta estos pasos en cada push a `main` y en cada pull request. Comprueba la sintaxis JavaScript, una construcción limpia y repetible que no modifica las fuentes, las seis páginas, los recursos locales, los identificadores repetidos y los enlaces internos con sus anclas. También comprueba las imágenes de CSS y los imports locales de módulos JavaScript.

Las comprobaciones no envían formularios ni consultan servicios externos. La recepción del correo, los enlaces de otros sitios y el funcionamiento visual se revisan aparte.

## Publicar en Vercel

El proyecto de Vercel está conectado a la rama `main` de este repositorio. La configuración está en `vercel.json`:

```sh
node build-pages.cjs && node prepare-vercel.cjs
```

El directorio de salida es `vercel-public/`. Se publican las páginas con rutas como `/proyectos` y `/experiencia`, junto con sus recursos y el CV. Las carpetas de trabajo y el instalador de escritorio quedan fuera del despliegue.

## Derechos de uso

Todos los derechos reservados. El código se publica como muestra de mi trabajo y su reutilización requiere autorización. Las fotos, el CV, los datos personales y los recursos de los proyectos no se ofrecen como materiales reutilizables. Las marcas y materiales de terceros conservan los derechos de sus titulares. Consulta el [aviso de derechos](LICENSE).
