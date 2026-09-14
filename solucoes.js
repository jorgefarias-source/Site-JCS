/* Pequenas interações de apresentação. Sem persistência e sem conexão a produtos. */
(() => {
  "use strict";
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  function initProducts() {
    const filters = $$("[data-filter]");
    filters.forEach(button => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        let visible = 0;
        filters.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
        $$("[data-product-card]").forEach(card => {
          const show = button.dataset.filter === "todas" || card.dataset.productCard === button.dataset.filter;
          card.hidden = !show;
          if (show) visible++;
        });
        const status = document.querySelector("[data-filter-status]");
        if (status) status.textContent = `${visible} ${visible === 1 ? "solução" : "soluções"}`;
      });
    });
    $$("[data-stock-demo]").forEach(demo => {
      if (demo.dataset.bound === "true") return;
      demo.dataset.bound = "true";
      const INITIAL = 1000, PORTION = 200;
      let stock = INITIAL;
      const use = demo.querySelector("[data-stock-use]");
      const reset = demo.querySelector("[data-stock-reset]");
      const bar = demo.querySelector("[data-stock-bar]");
      const track = demo.querySelector("[role=progressbar]");
      const value = demo.querySelector("[data-stock-value]");
      const status = demo.querySelector("[data-stock-status]");
      function update(isReset = false) {
        const number = new Intl.NumberFormat("pt-BR").format(stock);
        value.replaceChildren(document.createTextNode(number + " "));
        const unit = document.createElement("small"); unit.textContent = "g"; value.appendChild(unit);
        bar.style.width = `${stock / INITIAL * 100}%`;
        track.setAttribute("aria-valuenow", String(stock));
        track.setAttribute("aria-valuetext", `${number} gramas de ${INITIAL} gramas iniciais`);
        use.disabled = stock < PORTION;
        if (isReset) status.textContent = "Simulação reiniciada. 1 kg de estoque; cinco porções de 200 g.";
        else if (!stock) status.textContent = "Cinco porções utilizadas. Saldo zerado nesta simulação.";
        else status.textContent = `Porção de 200 g utilizada. Restam ${number} g nesta simulação.`;
      }
      use?.addEventListener("click", () => { if (stock >= PORTION) { stock -= PORTION; update(); } });
      reset?.addEventListener("click", () => { stock = INITIAL; update(true); });
    });
  }
  document.addEventListener("jordao:pagechange", initProducts);
  initProducts();
})();
