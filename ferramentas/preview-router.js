/* Somente a prévia de arquivo único utiliza este roteador. No projeto, as páginas
   são arquivos HTML independentes com links normais, inclusive sem JavaScript. */
(() => {
  "use strict";
  const pages = window.JORDAO_PREVIEW_PAGES;
  if (!pages) return;
  const slugToFile = {inicio:"index.html",solucoes:"solucoes.html",mordome:"mordome.html",cuidar:"cuidar.html","venda-de-celular":"venda-de-celular.html",petshop:"petshop.html"};
  const fileToSlug = Object.fromEntries(Object.entries(slugToFile).map(([slug,file]) => [file,slug]));
  let current = {file:"solucoes.html",search:"",anchor:""};
  let rendered = "solucoes.html";
  function encodeRoute(route) {
    const params = new URLSearchParams(route.search || "");
    if (route.anchor) params.set("secao", route.anchor); else params.delete("secao");
    const suffix = params.toString();
    return "#/" + (fileToSlug[route.file] || "solucoes") + (suffix ? "?"+suffix : "");
  }
  function decodeRoute() {
    const raw = location.hash.startsWith("#/") ? location.hash.slice(2) : "solucoes";
    const index = raw.indexOf("?");
    const slug = index < 0 ? raw : raw.slice(0,index);
    const params = new URLSearchParams(index < 0 ? "" : raw.slice(index+1));
    const anchor = params.get("secao") || "";
    params.delete("secao");
    return {file:slugToFile[slug] || "solucoes.html",search:params.toString() ? "?"+params.toString() : "",anchor};
  }
  function resolveHref(raw) {
    if (!raw || raw === "#" || raw.startsWith("#/") || /^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) return null;
    if (raw.startsWith("#")) return {file:current.file,search:current.search,anchor:raw.slice(1)};
    const found = raw.match(/^([a-z-]+\.html)(\?[^#]*)?(?:#(.*))?$/);
    if (!found || !pages[found[1]]) return null;
    return {file:found[1],search:found[2] || "",anchor:found[3] || ""};
  }
  function rewriteLinks() {
    document.querySelectorAll("a[href]").forEach(link => {
      if (link.id === "send-message" || link.id === "commercial-email") return;
      const raw = link.dataset.jordaoHref || link.getAttribute("href");
      const route = resolveHref(raw);
      if (!route) return;
      link.dataset.jordaoHref = raw;
      link.setAttribute("href",encodeRoute(route));
    });
  }
  function render(initial = false) {
    const route = decodeRoute();
    const data = pages[route.file];
    const changed = rendered !== route.file;
    if (changed) {
      document.querySelectorAll("dialog[open]").forEach(dialog => { if (dialog.close) dialog.close(); else dialog.removeAttribute("open"); });
      document.querySelector("main").outerHTML = data.main;
      rendered = route.file;
    }
    current = route;
    window.JORDAO_PREVIEW_ROUTE = {file:route.file,search:route.search};
    document.body.dataset.page = data.page;
    document.title = data.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content",data.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content",data.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content",data.description);
    rewriteLinks();
    document.dispatchEvent(new CustomEvent("jordao:pagechange",{detail:route}));
    requestAnimationFrame(() => {
      const target = route.anchor ? document.getElementById(route.anchor) : null;
      const root = document.documentElement;
      const previous = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      if (target) target.scrollIntoView({block:"start",behavior:"auto"});
      else if (changed || !initial) window.scrollTo({top:0,left:0,behavior:"auto"});
      root.style.scrollBehavior = previous;
      if (changed && !initial) {
        const main = document.querySelector("main");
        main.setAttribute("tabindex","-1");
        main.focus({preventScroll:true});
      }
    });
  }
  window.addEventListener("hashchange",() => render(false));
  // Repeated link selection must still scroll even when the hash is unchanged.
  document.addEventListener("click",event => {
    const link = event.target instanceof Element ? event.target.closest("a[href^='#/']") : null;
    if (!link || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0) return;
    if (link.getAttribute("href") === location.hash) { event.preventDefault(); render(false); }
  });
  render(true);
})();
