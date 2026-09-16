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
  }
  document.addEventListener("jordao:pagechange", initProducts);
  initProducts();
})();
