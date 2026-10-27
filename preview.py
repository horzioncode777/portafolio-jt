"""Local portfolio preview and double-click launcher. Uses Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import subprocess
import sys
import time
import urllib.error
import urllib.request
import webbrowser

ROOT = Path(__file__).resolve().parent
URL = 'http://127.0.0.1:4173/contacto.html'


class PortfolioHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs': 'text/javascript'}

    def end_headers(self):
        self.send_header('X-Portfolio-Preview', 'JuanTorres')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


def is_ready():
    try:
        with urllib.request.urlopen(URL, timeout=1) as response:
            if response.headers.get('X-Portfolio-Preview') != 'JuanTorres':
                raise RuntimeError('El puerto 4173 esta ocupado por otro servidor. Cierralo antes de abrir el portafolio.')
            return response.status == 200
    except (urllib.error.URLError, TimeoutError):
        return False


def launch():
    if not is_ready():
        logs = ROOT / 'tmp'
        logs.mkdir(exist_ok=True)
        with (logs / 'preview.log').open('a', encoding='utf-8') as output:
            subprocess.Popen(
                [sys.executable, str(Path(__file__).resolve()), '--serve'],
                cwd=ROOT, stdout=output, stderr=output,
                creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == 'win32' else 0,
            )
        for _ in range(30):
            if is_ready():
                break
            time.sleep(.2)
        else:
            raise RuntimeError('No se pudo iniciar el portafolio. Revisa tmp/preview.log.')
    webbrowser.open(URL)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--serve', action='store_true')
    args = parser.parse_args()
    try:
        if args.serve:
            handler = partial(PortfolioHandler, directory=str(ROOT / 'dist'))
            server = ThreadingHTTPServer(('127.0.0.1', 4173), handler)
            print(f'Portafolio: {URL}', flush=True)
            server.serve_forever()
        else:
            launch()
    except KeyboardInterrupt:
        pass
    except Exception as error:
        print(f'Error: {error}', file=sys.stderr)
        sys.exit(1)
