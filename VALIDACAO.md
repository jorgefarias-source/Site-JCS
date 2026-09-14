# Validação da entrega 05

- Inspeção estática dos HTML separados: arquivos, links, âncoras, IDs únicos, h1/main e noindex: OK.
- Prévia autossuficiente renderizada em memória (set_content); 6 páginas × 360, 390, 768 e 1440 px: sem overflow horizontal ou imagens quebradas.
- Filtros, simulação de 5 porções e reinício: OK.
- Roteador da prévia e seleção dos quatro produtos no contato: OK.
- Mensagem fictícia revisada no modal com CR Smart, sem enviar: OK.
- Menu móvel e FAQ por teclado: OK.
- Capturas obtidas da prévia entregue, sem montagem ou imagem gerada.

## Limites

O navegador de teste bloqueou navegação file:// e HTTP local por política do ambiente. Não foram alteradas essas políticas. A validação visual e interativa ocorreu em memória com o HTML autossuficiente, sem navegação de rede. A navegação entre os HTML separados foi verificada estaticamente, não clicada via file://.

Nenhum erro JavaScript foi capturado nos testes em memória. Não foram testados Safari/iOS, envio real por WhatsApp/e-mail, bancos de dados, autenticação dos produtos, pagamentos, publicação ou funcionalidades internas dos aplicativos hospedados. O número comercial permanece vazio.

Estas verificações cobrem a apresentação do site, não a homologação dos produtos.
