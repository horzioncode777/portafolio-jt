"""Comprueba la sintaxis del código y las referencias del sitio construido."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = ('index', 'sobre-mi', 'proyectos', 'habilidades', 'experiencia', 'contacto')


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.duplicates = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        identifier = attrs.get('id')
        if identifier:
            if identifier in self.ids:
                self.duplicates.append(identifier)
            self.ids.add(identifier)
        for attribute in ('href', 'src', 'poster', 'action'):
            if attrs.get(attribute):
                self.references.append(attrs[attribute])
        if attrs.get('srcset'):
            for source in attrs['srcset'].split(','):
                self.references.append(source.strip().split()[0])


def check_reference(root, origin, reference, pages):
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or not reference.strip():
        return None
    relative = unquote(parsed.path)
    target = ((root / relative.lstrip('/')) if relative.startswith('/')
              else origin.parent / relative) if relative else origin
    target = target.resolve()
    if not target.is_relative_to(root):
        return f'{reference}: ruta fuera del sitio'
    if target.is_dir():
        target /= 'index.html'
    elif not target.exists() and not target.suffix:
        target = target.with_suffix('.html')
    if not target.is_file():
        return f'{reference}: archivo inexistente'
    if parsed.fragment and target.suffix == '.html':
        if target not in pages:
            pages[target] = Page(target.read_text(encoding='utf-8'))
        if unquote(parsed.fragment) not in pages[target].ids:
            return f'{reference}: ancla inexistente'
    return None


def check_site(directory):
    root = Path(directory).resolve()
    errors = []
    pages = {}
    for slug in PAGES:
        if not (root / f'{slug}.html').is_file():
            errors.append(f'Falta la página {slug}.html')
    for file in sorted(root.rglob('*.html')):
        pages[file] = Page(file.read_text(encoding='utf-8'))
    for file, page in list(pages.items()):
        name = file.relative_to(root)
        errors.extend(f'{name}: id repetido: {identifier}' for identifier in page.duplicates)
        for reference in page.references:
            problem = check_reference(root, file, reference, pages)
            if problem:
                errors.append(f'{name}: {problem}')
    for file in sorted(root.rglob('*')):
        if file.suffix == '.css':
            references = re.findall(r'url\(\s*[\"\']?([^\"\')]+)', file.read_text(encoding='utf-8'))
        elif file.suffix in ('.js', '.mjs'):
            references = re.findall(r'(?:from\s*|import\s*)[\"\'](\.[^\"\']+)', file.read_text(encoding='utf-8'))
        else:
            continue
        for reference in references:
            problem = check_reference(root, file, reference.strip(), pages)
            if problem:
                errors.append(f'{file.relative_to(root)}: {problem}')
    return errors


def check_syntax():
    files = subprocess.check_output(['git', 'ls-files', '-z'], cwd=ROOT).decode().split('\0')
    for name in files:
        if Path(name).suffix in ('.cjs', '.js', '.mjs'):
            subprocess.run(['node', '--check', str(ROOT / name)], check=True)
    print('Sintaxis JavaScript correcta.')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('directory', nargs='?', default='vercel-public')
    parser.add_argument('--syntax', action='store_true')
    args = parser.parse_args()
    if args.syntax:
        check_syntax()
        return 0
    errors = check_site(args.directory)
    if errors:
        print('\n'.join(errors), file=sys.stderr)
        return 1
    print('Páginas, recursos y enlaces internos correctos.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
