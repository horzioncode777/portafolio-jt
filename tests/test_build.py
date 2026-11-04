import hashlib
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

from scripts.check_site import check_site

ROOT = Path(__file__).resolve().parents[1]


def hashes(directory):
    return {str(file.relative_to(directory)): hashlib.sha256(file.read_bytes()).hexdigest()
            for file in directory.rglob('*') if file.is_file()}


class BuildChecks(unittest.TestCase):
    def test_clean_and_repeatable_build(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / 'src', root / 'src')
            for name in ('build-pages.cjs', 'prepare-vercel.cjs', 'deployment-config.json'):
                shutil.copy2(ROOT / name, root / name)
            sources = hashes(root / 'src')
            subprocess.run(['node', 'build-pages.cjs'], cwd=root, check=True, capture_output=True)
            first = hashes(root / 'dist')
            self.assertEqual(check_site(root / 'dist'), [])
            subprocess.run(['node', 'build-pages.cjs'], cwd=root, check=True, capture_output=True)
            self.assertEqual(first, hashes(root / 'dist'))
            self.assertEqual(sources, hashes(root / 'src'))
            subprocess.run(['node', 'prepare-vercel.cjs'], cwd=root, check=True, capture_output=True)
            self.assertEqual(check_site(root / 'vercel-public'), [])


if __name__ == '__main__':
    unittest.main()
