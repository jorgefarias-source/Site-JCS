# Pendências editoriais — revisão 06

## Aprovado para publicação (16/09/2026)

O responsável confirmou os quatro pontos abaixo e autorizou a publicação:

1. Mordomê: delivery com rastreio e pagamento dividido entram no anúncio como recursos disponíveis, mesmo com o catálogo funcional (`docs/FUNCOES.md`) ainda desatualizado. A cozinha em tempo real por push continua fora do anúncio (planejada, sem código correspondente).
2. Cuidar e Petshop: conteúdo das páginas aprovado como pronto para publicação.
3. Canal comercial (WhatsApp `55 22 98178-8867` e e-mail `jorge.farias@jordaoconsultoria.com`) configurado em `config.js` e testado pelo responsável.
4. `noindex, nofollow` removido das 6 páginas do site (index, solucoes, mordome, cuidar, venda-de-celular, petshop).

## Pendências que seguem em aberto

- Mordomê: recomenda-se que o time atualize `docs/FUNCOES.md` para refletir delivery, rastreio e pagamento dividido como implementados, já que o site agora anuncia esses recursos antes dessa atualização formal.
- Mordomê: continuar não prometendo o que está fora do MVP (Continuidade/offline, cozinha em tempo real por push e demais itens listados em FONTES-E-ESCOPO.md).
- Cuidar: sistema roda em SQLite (instalação única) — não anunciar como multi-instância ou alta disponibilidade.
- Petshop: segundo o diário de desenvolvimento do próprio autor, o sistema ainda não foi implantado em produção — não anunciar como já hospedado ou em uso comercial sem confirmação adicional do cliente.
- CR Smart: não confundir cálculo de taxas com cobrança integrada, cadastro de estoque com baixa automática, IMEI do conserto com rastreamento completo, ou abertura do WhatsApp com envio automático. O módulo financeiro é agregação de registros, sem CRUD de despesas nesse commit.
- Em todos: substituir composições editoriais por capturas reais autorizadas, quando disponíveis. Para o Mordomê, usar a branch `main` do repositório como fonte de imagens (não `cliente/betao`).

Ver FONTES-E-ESCOPO.md para a rastreabilidade de cada decisão editorial.
