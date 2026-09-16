/* Jordão / interações compartilhadas — pages statiques et prévia autossuficiente.
   Nenhum envio automático, armazenamento de leads ou dependência externa. */
(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const originalHref = link => link.dataset.jordaoHref || link.getAttribute("href") || "";
  const PRODUCTS = Object.freeze({mordome: "Mordomê", cuidar: "Cuidar", "venda-de-celular": "CR Smart", petshop: "Petshop"});
  const conf = window.JORDAO_CONFIG || {};
  const phoneDigits = typeof conf.whatsapp === "string" ? conf.whatsapp.replace(/\D/g, "") : "";
  const phone = /^[1-9]\d{9,14}$/.test(phoneDigits) ? phoneDigits : "";
  const emailInput = typeof conf.emailComercial === "string" ? conf.emailComercial.trim() : "";
  const email = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(emailInput) ? emailInput : "";
  const hasChannel = Boolean(phone || email);
  if ($("#year")) $("#year").textContent = String(new Date().getFullYear());

  const nav = $("#navegacao");
  const menuButton = $(".menu-toggle");
  function setMenu(open) {
    if (!menuButton || !nav) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }
  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("#navegacao a") || (!nav?.contains(target) && !menuButton?.contains(target))) setMenu(false);
    const serviceLink = target.closest("[data-service]");
    if (serviceLink) {
      const interest = $("#interesse");
      if (interest && [...interest.options].some(o => o.value === serviceLink.dataset.service)) interest.value = serviceLink.dataset.service;
      const challenge = $("#desafio");
      if (challenge && serviceLink.dataset.challenge && !challenge.value.trim()) challenge.value = serviceLink.dataset.challenge;
      updateCount();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false); menuButton.focus();
    }
  });
  window.matchMedia("(min-width: 1001px)").addEventListener("change", () => setMenu(false));

  const messageDialog = $("#message-dialog");
  const privacyDialog = $("#privacy-dialog");
  const triggers = new WeakMap();
  let message = "";
  function openDialog(dialog) {
    if (!dialog) return;
    triggers.set(dialog, document.activeElement);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else { dialog.removeAttribute("open"); triggers.get(dialog)?.focus(); }
  }
  $$("dialog").forEach(dialog => {
    $$("[data-close-dialog]", dialog).forEach(button => button.addEventListener("click", () => closeDialog(dialog)));
    dialog.addEventListener("close", () => { if (triggers.get(dialog)?.isConnected) triggers.get(dialog).focus(); });
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(dialog);
    });
  });
  $("#privacy-button")?.addEventListener("click", () => openDialog(privacyDialog));

  function updateCount() {
    const field = $("#desafio"), count = $("#char-count");
    if (field && count) count.textContent = `${field.value.length} / 1500`;
  }
  function applyProduct(slug) {
    if (!Object.prototype.hasOwnProperty.call(PRODUCTS, slug)) return;
    const product = $("#produto"), interest = $("#interesse"), challenge = $("#desafio");
    if (product) product.value = slug;
    if (interest) interest.value = "Software";
    if (challenge && !challenge.value.trim()) challenge.value = `Gostaria de conhecer melhor a solução ${PRODUCTS[slug]} e entender como ela pode atender ao meu negócio.`;
    updateCount();
  }
  function initForm() {
    const form = $("#briefing-form");
    if (!form) return;
    const draftNote = $("#draft-note");
    if (draftNote) draftNote.hidden = hasChannel;
    const commercialEmail = $("#commercial-email");
    if (email && commercialEmail) {
      commercialEmail.textContent = email;
      commercialEmail.href = `mailto:${email}`;
      commercialEmail.hidden = false;
    }
    const submit = form.querySelector("button[type=submit]");
    if (submit) submit.disabled = false;
    const params = new URLSearchParams(window.JORDAO_PREVIEW_ROUTE?.search || window.location.search);
    applyProduct(params.get("solucao") || "");
    updateCount();
    if (form.dataset.bound === "true") return;
    form.dataset.bound = "true";
    const name = $("#nome"), interest = $("#interesse"), challenge = $("#desafio");
    challenge.addEventListener("input", updateCount);
    [name, challenge].forEach(field => field.addEventListener("input", () => field.setCustomValidity("")));
    $("#produto")?.addEventListener("change", event => {
      if (event.target.value) interest.value = "Software";
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      name.setCustomValidity(name.value.trim().length < 2 ? "Informe seu nome com pelo menos 2 caracteres." : "");
      challenge.setCustomValidity(challenge.value.trim().length < 10 ? "Conte seu desafio com pelo menos 10 caracteres." : "");
      if (!form.reportValidity()) return;
      const company = $("#empresa").value.trim();
      const productSlug = $("#produto")?.value || "";
      const lines = ["Olá, Jordão! Gostaria de conversar sobre uma solução para o meu negócio.", "", `Nome: ${name.value.trim()}`];
      if (company) lines.push(`Empresa: ${company}`);
      lines.push(`Interesse: ${interest.value}`);
      if (Object.prototype.hasOwnProperty.call(PRODUCTS, productSlug)) lines.push(`Solução: ${PRODUCTS[productSlug]}`);
      lines.push("", "Meu desafio:", challenge.value.trim());
      message = lines.join("\n");
      $("#message-preview").textContent = message;
      $("#copy-status").textContent = "";
      const send = $("#send-message");
      send.hidden = !hasChannel;
      if (phone) {
        send.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        send.textContent = "Abrir WhatsApp";
        $("#channel-note").textContent = "O WhatsApp será aberto com este texto. Revise o destinatário e confirme o envio no aplicativo.";
      } else if (email) {
        send.href = `mailto:${email}?subject=${encodeURIComponent("Primeira conversa — Jordão")}&body=${encodeURIComponent(message)}`;
        send.textContent = "Abrir aplicativo de e-mail";
        $("#channel-note").textContent = "Seu aplicativo de e-mail será aberto com a mensagem. O envio depende da sua confirmação.";
      } else {
        send.removeAttribute("href");
        $("#channel-note").textContent = "Esta é uma prévia: o canal comercial ainda será configurado. Você pode copiar a mensagem, mas ela não será enviada por este site.";
      }
      openDialog(messageDialog);
    });
  }
  async function copyMessage(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* Contexto local/restrito. */ }
    }
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("aria-label", "Mensagem para copiar");
    helper.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;";
    messageDialog.appendChild(helper); helper.focus(); helper.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    helper.remove(); $("#copy-message").focus(); return copied;
  }
  $("#copy-message")?.addEventListener("click", async () => {
    const copied = await copyMessage(message);
    $("#copy-status").textContent = copied ? "Mensagem copiada. Nenhuma mensagem foi enviada." : "A cópia foi bloqueada pelo navegador. Selecione e copie o texto acima manualmente.";
  });

  let observer;
  function initNavigation() {
    observer?.disconnect();
    const home = document.body.dataset.page === "inicio";
    $$("#navegacao>a").forEach(link => {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
      if (!home && originalHref(link) === "solucoes.html") link.setAttribute("aria-current", document.body.dataset.page === "solucoes" ? "page" : "location");
    });
    if (!home || !("IntersectionObserver" in window)) return;
    const links = $$(".nav > a").filter(link => originalHref(link).startsWith("index.html#"));
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const active = originalHref(link) === `index.html#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
        });
      });
    }, {rootMargin:"-12% 0px -68% 0px", threshold:0});
    $$("main > section[id]").forEach(section => observer.observe(section));
  }
  let revealObserver;
  function initReveal() {
    revealObserver?.disconnect();
    const targets = $$("[data-reveal]");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: 0.14, rootMargin: "0px 0px -8% 0px"});
    targets.forEach(el => revealObserver.observe(el));
  }

  function initStickyCta() {
    const bar = $("#sticky-cta");
    const hero = $("#inicio");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => bar.classList.toggle("is-shown", !entry.isIntersecting));
    }, {threshold: 0});
    io.observe(hero);
  }

  function initPage() { setMenu(false); initForm(); initNavigation(); initReveal(); initStickyCta(); }
  document.addEventListener("jordao:pagechange", initPage);
  initPage();
})();
