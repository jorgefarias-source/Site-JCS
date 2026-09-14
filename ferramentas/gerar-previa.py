"""Gera a prévia autossuficiente usando apenas a biblioteca padrão do Python.
Uso: python ferramentas/gerar-previa.py [caminho-do-html-de-saida]
A publicação usa os arquivos HTML normais; este arquivo é apenas para revisão.
"""
from pathlib import Path
import base64
import html
import json
import mimetypes
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT.parent / 'Jordao-site-previa-v5.html'
FILES = ['index.html','solucoes.html','mordome.html','cuidar.html','venda-de-celular.html','petshop.html']
cache = {}

def inline_assets(markup: str) -> str:
    def replace(match):
        name = match.group(2)
        if name not in cache:
            path = (ROOT / name).resolve()
            if not path.is_relative_to(ROOT) or not path.is_file():
                raise ValueError('Recurso inválido: ' + name)
            mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
            cache[name] = 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode('ascii')
        return match.group(1) + cache[name] + match.group(3)
    return re.sub(r'(<(?:img|link)\b[^>]*?(?:src|href)=["\'])(assets/[^"\']+)(["\'])', replace, markup, flags=re.I)

pages = {}
for name in FILES:
    markup = (ROOT / name).read_text(encoding='utf-8')
    main_match = re.search(r'<main\b.*?</main>', markup, flags=re.S)
    title_match = re.search(r'<title>(.*?)</title>', markup, flags=re.S)
    body_match = re.search(r'<body[^>]*data-page=["\']([^"\']+)', markup)
    description_match = re.search(r'<meta[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description', markup)
    if not all([main_match,title_match,body_match,description_match]):
        raise ValueError('Estrutura incompleta: ' + name)
    pages[name] = dict(main=inline_assets(main_match.group()),title=html.unescape(title_match.group(1)),page=body_match.group(1),description=html.unescape(description_match.group(1)))

base = (ROOT / 'solucoes.html').read_text(encoding='utf-8')
base = re.sub(r'<link\b[^>]*rel=["\']stylesheet["\'][^>]*>', '', base)
base = re.sub(r'<script\b[^>]*src=["\'][^"\']+["\'][^>]*>\s*</script>', '', base)
css = (ROOT / 'styles.css').read_text(encoding='utf-8') + '\n' + (ROOT / 'solucoes.css').read_text(encoding='utf-8')
base = base.replace('</head>', '<style>\n'+css+'\n</style></head>')
base = inline_assets(base)
def script_tag(text):
    return '<script>\n'+text.replace('</script','<\\/script')+'\n</script>'
page_data = json.dumps(pages, ensure_ascii=False, separators=(',',':')).replace('<','\\u003c')
scripts = script_tag('window.JORDAO_PREVIEW_PAGES = '+page_data+';')
scripts += script_tag((ROOT / 'config.js').read_text(encoding='utf-8'))
scripts += script_tag((ROOT / 'ferramentas/preview-router.js').read_text(encoding='utf-8'))
scripts += script_tag((ROOT / 'script.js').read_text(encoding='utf-8'))
scripts += script_tag((ROOT / 'solucoes.js').read_text(encoding='utf-8'))
base = base.replace('</body>',scripts+'</body>')
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(base,encoding='utf-8')
print(f'Prévia criada: {OUT} ({OUT.stat().st_size:,} bytes)')
