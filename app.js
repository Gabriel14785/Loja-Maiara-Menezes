(function () {
  "use strict";

  var loja = window.LOJA || { categorias: [], produtos: [] };
  var cats = loja.categorias || [];
  var prods = (loja.produtos || []).slice();

  // Sem produtos reais ainda: gera espaços reservados por categoria
  if (prods.length === 0) {
    cats.forEach(function (c) {
      for (var i = 1; i <= 4; i++) {
        prods.push({ id: c.id + "-" + i, nome: "", categoria: c.id, preco: null, foto: null, desc: "" });
      }
    });
  }

  var ativo = "todas";
  var filtros = document.getElementById("filtros");
  var grade = document.getElementById("gradeProdutos");
  var vazio = document.getElementById("lojaVazio");

  function catNome(id) {
    var c = cats.filter(function (x) { return x.id === id; })[0];
    return c ? c.nome : id;
  }
  function precoTxt(p) {
    return p.preco == null ? "Preço em breve" : "R$ " + Number(p.preco).toFixed(2).replace(".", ",");
  }
  function midia(p, nome) {
    return p.foto
      ? '<img src="' + p.foto + '" alt="' + nome + '" class="w-full h-full object-cover" loading="lazy"/>'
      : '<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Foto em breve</span>';
  }

  function renderFiltros() {
    if (!filtros) return;
    var itens = [{ id: "todas", nome: "Todas" }].concat(cats);
    filtros.innerHTML = itens.map(function (it) {
      var on = it.id === ativo;
      return '<button type="button" data-filtro="' + it.id + '" class="px-space-md py-2 rounded-full border font-label-md text-label-md transition-colors cursor-pointer ' +
        (on
          ? "bg-primary-container text-on-primary-container border-primary-container"
          : "border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary") +
        '">' + it.nome + "</button>";
    }).join("");
  }

  function cardProduto(p) {
    var nome = p.nome || "Nome em breve";
    return '<article class="group bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-md hover:border-primary-container transition-all duration-200">' +
      '<button type="button" data-prod="' + p.id + '" class="block w-full text-left cursor-pointer">' +
        '<div class="aspect-[3/4] bg-surface-variant border-b border-outline-variant flex items-center justify-center p-space-md text-center overflow-hidden">' + midia(p, nome) + "</div>" +
        '<div class="p-space-md">' +
          '<span class="text-label-sm font-label-sm text-secondary uppercase tracking-widest block">' + catNome(p.categoria) + "</span>" +
          '<h4 class="font-headline-sm text-headline-sm text-on-surface">' + nome + "</h4>" +
          '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + precoTxt(p) + "</p>" +
        "</div>" +
      "</button></article>";
  }

  function renderGrade() {
    if (!grade) return;
    var lista = prods.filter(function (p) { return ativo === "todas" || p.categoria === ativo; });
    grade.innerHTML = lista.map(cardProduto).join("");
    if (vazio) vazio.classList.toggle("hidden", lista.length > 0);
  }

  // ----- Modal -----
  var modal = document.getElementById("modalProduto");

  function abrirModal(id) {
    var p = prods.filter(function (x) { return x.id === id; })[0];
    if (!p || !modal) return;
    var nome = p.nome || "Nome em breve";
    document.getElementById("modalCategoria").textContent = catNome(p.categoria);
    document.getElementById("modalTitulo").textContent = nome;
    document.getElementById("modalDesc").textContent = p.desc || "Informações desta peça em breve.";
    document.getElementById("modalPreco").textContent = precoTxt(p);
    document.getElementById("modalMidia").innerHTML = midia(p, nome);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
  function fecharModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  // ----- Eventos -----
  if (filtros) {
    filtros.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filtro]");
      if (!b) return;
      ativo = b.getAttribute("data-filtro");
      renderFiltros();
      renderGrade();
    });
  }
  if (grade) {
    grade.addEventListener("click", function (e) {
      var b = e.target.closest("[data-prod]");
      if (!b) return;
      abrirModal(b.getAttribute("data-prod"));
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-cat]"), function (el) {
    function ir() {
      ativo = el.getAttribute("data-cat");
      renderFiltros();
      renderGrade();
      var sec = document.getElementById("loja");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    }
    el.addEventListener("click", ir);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ir(); }
    });
  });
  var fechar = document.getElementById("modalFechar");
  var fundo = document.getElementById("modalFundo");
  if (fechar) fechar.addEventListener("click", fecharModal);
  if (fundo) fundo.addEventListener("click", fecharModal);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharModal(); });

  renderFiltros();
  renderGrade();
})();

// ===== Menu mobile (o Stitch nao tinha) =====
(function () {
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("menuMobile");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(menu.classList.contains("hidden"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024 && !menu.classList.contains("hidden")) setOpen(false);
  });
})();
