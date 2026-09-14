# Fontes e escopo da revisão 05 — 14/09/2026

## Como esta revisão foi feita

Leitura via conectores GitHub e Railway. Foram consultados metadados de deploy,
arquivos de interface, rotas de servidor e documentação de produto. Nenhum commit,
push, deploy, reinício, consulta de banco ou leitura de segredo foi realizado.
A validação de navegação descrita em VALIDACAO.md se refere apenas ao site estático
entregue, não aos sistemas CR Smart ou Mordomê.

## CR Smart

O responsável confirmou que CR Smart corresponde à solução de venda de celulares.
O Railway retornou para o último deploy do serviço cr-smart-app o commit
`de953c1d7b5f71502dfecab41d9fb824d9b9fdc0`, branch
`claude/sistema-gerenciador-lojas-celulares-mjjv3i`, do repositório
`jjrfarias/chatbot-web`. Foi esse commit, não a branch main ou cliente-cr-smart,
que fundamentou o conteúdo. O status SUCCESS não prova que todos os fluxos foram
homologados ou que os resultados financeiros estão corretos.

Fontes no commit consultado:

- [Rotas da interface](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/client/src/App.tsx): clientes, CRM, ações, vendas, consertos, financeiro, estoque e histórico.
- [Chamadas da interface](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/client/src/api.ts): contratos das operações e seus campos.
- [Vendas](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/server/src/routes/sales.ts): venda, cliente, avaliação de troca, lista de verificação, garantia, taxas e vínculo com oportunidade.
- [Consertos](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/server/src/routes/repairs.ts): IMEI opcional, defeitos, prazo, orçamento estimado, status e histórico CRM.
- [Estoque](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/server/src/routes/inventory.ts): cadastro e consulta de aparelhos e peças; cálculo de indicação de estoque baixo.
- [Relacionamento](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/server/src/routes/crm.ts): etapas de vendas/assistência, tarefas, modelos de mensagem e abertura de WhatsApp.
- [Resumo gerencial](https://github.com/jjrfarias/chatbot-web/blob/de953c1d7b5f71502dfecab41d9fb824d9b9fdc0/server/src/routes/finance.ts): agrega registros de vendas, estimatedBudget dos consertos e despesas. Não deve ser apresentado como recebimento liquidado, conciliação bancária ou lucro comprovado.

Limites editoriais importantes: não prometer baixa automática de estoque, emissão
fiscal, cobrança integrada, rastreamento de IMEI em todas as vendas/estoque, robô
WhatsApp, disparo automático ou conformidade/certificação de segurança. Essas
capacidades não foram comprovadas nesta leitura. A presença de código é evidência
de implementação, não teste de funcionamento de ponta a ponta.

## Mordomê

Repositório acessível: `jjrfarias/mordome`; branch padrão retornada: `cliente/betao`.

- [Índice da documentação](https://github.com/jjrfarias/mordome/blob/cliente/betao/docs/README.md): define Implementado, Decidido, Planejado e Fora do MVP.
- [Catálogo funcional](https://github.com/jjrfarias/mordome/blob/cliente/betao/docs/FUNCOES.md): base principal desta revisão; blob SHA `e9fdaaefdaef72ff823fcd70b1a2836c71cfd2fb` consultado em 14/09/2026.
- [README da raiz](https://github.com/jjrfarias/mordome/blob/cliente/betao/README.md): consultado; contém descrição de uma fase anterior, com limitações diferentes do catálogo funcional. O índice da documentação aponta docs/ como fonte de verdade. A divergência deve ser revisada pelo mantenedor.

As afirmações sobre recursos implementados nesta entrega refletem o catálogo
funcional, não execução do aplicativo. O deploy do Mordomê consultado não informou
commit; portanto não foi possível comprovar equivalência entre código/documentação
e o ambiente publicado. Não são anunciados como prontos delivery operacional,
Continuidade/offline, pagamento dividido ou cozinha em tempo real por push.

## Cuidar

Relação Cuidar = Núcleo Criar confirmada pelo responsável na conversa. O Railway
associa o serviço a `jjrfarias/clinicas`, branch `cliente/nucleo-criar`. A consulta
GitHub ao repositório retornou 404. A conta autenticada é jjrfarias, mas a listagem
da integração não revelou acesso a clinicas. Um 404 não distingue falta de
permissão, mudança de nome e inexistência. Não foram adivinhados módulos clínicos.

## Petshop

Nome informado pelo responsável. Nenhum repositório com esse nome foi identificado
na lista acessível da conta nesta revisão. Não equivale a afirmar que não existe.
As sugestões editoriais da versão 4 continuam explicitamente não verificadas.

## Próximos insumos

Liberar ou corrigir o acesso ao repositório do Cuidar; identificar o repositório
Petshop; validar conteúdo comercial, escopo de implantação e telas para divulgação.
As composições de produto entregues são ilustrativas, sem dados reais de clientes.
