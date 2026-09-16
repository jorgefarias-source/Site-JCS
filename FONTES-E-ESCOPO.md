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

Reconfirmado na revisão 06 (16/09/2026), mesmo commit: o módulo financeiro não tem
rota de criação/edição de despesas neste commit, apenas leitura de registros
semeados — é agregação, não um controle de caixa completo. A rota `home.ts`
(resumo do dia, ticket médio) também foi confirmada como real.

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

**Achado da revisão 06 (16/09/2026)**: `docs/FUNCOES.md` só foi tocado no commit
inicial (`00ab8c0`). Commits posteriores da branch (`14b68fc` "completa operação
multiunidade do Betão"; `fbae8ac` "adiciona salão com áreas/garçom, delivery
operacional e rastreio com mapa") implementaram código real para delivery
operacional, rastreio de entregador com mapa e pagamento dividido — recursos que
o próprio `FUNCOES.md` ainda lista como "Planejado". Ou seja, o documento indicado
como fonte de verdade está desatualizado em relação ao código. Como esses três
itens não têm validação/documentação formal de "concluído" pelos critérios do
próprio projeto, o site os trata como "em desenvolvimento, não confirmados para
anúncio comercial" — nem como inexistentes, nem como prontos. Recomenda-se que o
time do Mordomê atualize o catálogo funcional antes de decidir o que promover.

## Cuidar

Relação Cuidar = Núcleo Criar confirmada pelo responsável. Na revisão 05, o Railway
associava o serviço a `jjrfarias/clinicas`, mas a consulta GitHub retornou 404.

**Resolvido na revisão 06 (16/09/2026)**: acesso ao repositório `jjrfarias/clinicas`
liberado (branch padrão `main`). Fontes: `README.md`, `docs/ENTREGA_CLIENTE.md`,
`brain.md`, árvore `src/features`, `src/data`, `src/domain`, `server/`.

Módulos confirmados em código: agenda com regras de conflito (`server/appointmentRules.ts`),
pacientes e ficha (`src/features/PatientsPage.tsx`), prontuário e odontograma
(`server/clinicalRecordData.ts`, `src/features/Odontogram.tsx`), plano de cuidado
(`src/domain/carePlan.ts`), atendimento/check-in (`src/features/AttendanceModal.tsx`),
financeiro e comissão (`server/financeData.ts`, `src/domain/commission.ts`),
equipe e RBAC (`server/permissions.ts`), unidades e recursos (`src/features/UnitsPage.tsx`),
serviços (`src/features/ServicesPage.tsx`), lista de espera (`src/features/WaitlistPage.tsx`),
relatórios (`src/features/ReportsPage.tsx`), auditoria (`server/auditData.ts`),
backup (`server/backup.ts`), autenticação e segurança (`server/auth.ts`, `server/security.ts`),
automação de WhatsApp por pareamento de aparelho (`server/whatsapp/*`).

Limites declarados no próprio repositório (README "Limites conhecidos" e
`docs/ENTREGA_CLIENTE.md`): sem garantia de entrega no WhatsApp (depende de
pareamento, sem SLA); sem integração eletrônica com convênios/TISS nem emissão
fiscal; SQLite atende instalação única/pequena, não alta disponibilidade; backup
externo, monitoramento 24x7 e resposta a incidentes pertencem ao ambiente do
cliente; conformidade LGPD completa pendente de revisão jurídica; sem gateway de
pagamento (nenhuma dependência encontrada no código); sem IA clínica/diagnóstica
(excluída explicitamente em `brain.md` sem requisitos regulatórios definidos);
estoque/lotes, portal do paciente e assinatura recorrente aparecem só como
backlog, sem implementação correspondente.

## Petshop

Nome informado pelo responsável. Na revisão 05, nenhum repositório havia sido
identificado.

**Resolvido na revisão 06 (16/09/2026)**: repositório privado `jjrfarias/petshop`
identificado e acessado (branch padrão `master`, descrição "Sistema de gestao e
vendas para petshop e agropecuária"). Stack NestJS + Prisma + PostgreSQL (API) e
Next.js + Tailwind (web), monorepo com testes automatizados (vitest) e CI.

Módulos confirmados em código, com CRUD real (controllers + services + DTOs +
Prisma) e tela correspondente: autenticação/papéis (`apps/api/src/auth`),
clientes e pets (`apps/api/src/clientes`, `apps/api/src/pets`), produtos por
unidade ou peso (`apps/api/src/produtos`), estoque por lote com baixa automática
por validade/FIFO — validado por teste automatizado `estoque.service.spec.ts` —,
PDV (`apps/api/src/vendas`, teste `vendas.service.spec.ts`), financeiro básico
com lançamento automático de receita por venda (`apps/api/src/financeiro`),
agendamento de banho/tosa com checagem de conflito e geração automática de
lançamento financeiro (`apps/api/src/agendamentos`), e dashboard
(`apps/web/src/app/dashboard`).

Confirmado como inexistente no código: emissão de nota fiscal, gateway de
pagamento/cobrança integrada, notificações automáticas (WhatsApp/SMS/e-mail),
e-commerce, assinatura/recorrência, multi-loja, fidelidade. Segundo o `brain.md`
do próprio autor, o sistema ainda não foi implantado em produção (só dev/CI) —
não anunciar como já hospedado ou em uso comercial sem confirmação do cliente.

## Próximos insumos

Confirmar com o dono do Mordomê o status de delivery operacional, rastreio de
entregador e pagamento dividido antes de promovê-los como recursos maduros.
Validar com a Jordão a data/local de implantação comercial do Cuidar e do
Petshop antes de publicar qualquer prazo. As composições de produto entregues
são ilustrativas, sem dados reais de clientes.
