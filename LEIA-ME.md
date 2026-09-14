# Jordão Consultoria e Soluções — revisão 05

Site institucional com seis páginas HTML, sem dependências externas. Abra
`index.html` no navegador, mantendo os demais arquivos e a pasta assets ao lado.
A prévia separada Jordao-site-previa-v5.html reúne todas as páginas em um único
arquivo e abre na vitrine. Alguns visualizadores de anexos não executam JavaScript;
abra em um navegador para usar a navegação da prévia.

## Páginas

| Arquivo | Apresentação |
| --- | --- |
| index.html | Institucional, vitrine resumida e contato |
| solucoes.html | Vitrine de produtos com filtros |
| mordome.html | Mordomê, com conteúdo baseado no catálogo funcional |
| cuidar.html | Cuidar = Núcleo Criar; funcionalidades pendentes de acesso |
| venda-de-celular.html | CR Smart; URL anterior preservada para compatibilidade |
| petshop.html | Página preliminar, sem funcionalidades verificadas |

## O que mudou

CR Smart e Mordomê receberam descrições baseadas no material técnico consultado,
perguntas e limites de escopo. A identidade Cuidar = Núcleo Criar foi incorporada.
O logo oficial, a paleta monocromática e a ausência de asteriscos ou setas
decorativas foram preservados. Os botões são textuais. Nenhum sistema em produção
foi alterado e o site não foi publicado.

## Manutenção

Textos consolidados em conteudo-solucoes.json. As páginas HTML desta versão já
contêm o conteúdo e não fazem fetch do JSON. Ao editar, mantenha ambos em sincronia.
Para regenerar o arquivo único após editar os HTML, execute:

```text
python ferramentas/gerar-previa.py caminho/Jordao-site-previa-v5.html
```

O roteador da prévia existe somente no arquivo único; os HTML separados usam links
normais e podem ser abertos sem servidor local. Os filtros e a simulação dependem
de JavaScript. O formulário prepara uma mensagem, não envia dados a um servidor.

O WhatsApp comercial ainda não está configurado. Edite config.js somente depois
de confirmar o número ou e-mail de atendimento. Não inclua senhas, tokens ou
chaves de API no site estático. A simulação de consumo é local e não usa estoque real.

## Aprovação antes de publicar

Leia CONTEUDO-A-VALIDAR.md e FONTES-E-ESCOPO.md. Cuidar e Petshop ainda não têm
fichas funcionais verificadas. O conteúdo do Mordomê reflete documentação, não
testes na aplicação. O conteúdo do CR Smart reflete leitura do código do commit
informado pelo Railway, também sem teste na aplicação. A validação desta entrega
cobre apenas a navegação e apresentação do site estático.

Os arquivos preservam noindex, nofollow. Domínio, contato, escopo comercial,
termos e eventuais capturas de clientes devem ser aprovados antes de publicar.
