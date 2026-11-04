from pathlib import Path
import tempfile
import unittest

from scripts.check_site import Page, check_reference, check_site


class SiteChecks(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name).resolve()
        self.home = self.root / 'index.html'
        self.home.write_text('<h1 id="inicio">Inicio</h1>', encoding='utf-8')
        (self.root / 'proyectos.html').write_text('<h1 id="piano">Piano</h1>', encoding='utf-8')

    def reference(self, value):
        return check_reference(self.root, self.home, value, {})

    def test_clean_url_with_anchor(self):
        self.assertIsNone(self.reference('/proyectos#piano'))

    def test_missing_anchor(self):
        self.assertIn('ancla inexistente', self.reference('proyectos.html#otro'))

    def test_missing_asset(self):
        self.assertIn('archivo inexistente', self.reference('assets/ausente.png'))

    def test_query_and_encoded_filename(self):
        (self.root / 'mi foto.png').write_bytes(b'preview')
        self.assertIsNone(self.reference('mi%20foto.png?v=1'))

    def test_external_links_are_not_requested(self):
        self.assertIsNone(self.reference('https://example.com/proyectos'))
        self.assertIsNone(self.reference('mailto:juan@example.com'))

    def test_parent_directory_is_rejected(self):
        self.assertIn('fuera del sitio', self.reference('../privado.txt'))

    def test_duplicate_ids(self):
        page = Page('<h2 id="piano"></h2><div id="piano"></div>')
        self.assertEqual(page.duplicates, ['piano'])

    def test_empty_directory_fails(self):
        self.assertTrue(check_site(self.root / 'no-existe'))

    def test_css_resource_is_checked(self):
        (self.root / 'styles.css').write_text('body{background:url("missing.png")}', encoding='utf-8')
        self.assertTrue(any('missing.png' in error for error in check_site(self.root)))

    def test_module_import_is_checked(self):
        (self.root / 'app.mjs').write_text('import {send} from "./missing.mjs";', encoding='utf-8')
        self.assertTrue(any('missing.mjs' in error for error in check_site(self.root)))


if __name__ == '__main__':
    unittest.main()
