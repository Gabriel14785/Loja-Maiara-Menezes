(function () {
  "use strict";

  var WA_NUMBER = "553388383522";
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
  function fmt(v) { return Number(v).toFixed(2).replace(".", ","); }
  function precoTxt(p) { return p.preco == null ? "Preço em breve" : "R$ " + fmt(p.preco); }
  function midia(p, nome) {
    return p.foto
      ? '<img src="' + p.foto + '" alt="' + nome + '" class="w-full h-full object-cover" loading="lazy"/>'
      : '<span class="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Foto em breve</span>';
  }
  function nomeDe(p) { return p.nome || "Nome em breve"; }

  // ---------- Loja ----------
  function renderFiltros() {
    if (!filtros) return;
    var itens = [{ id: "todas", nome: "Todas" }].concat(cats);
    filtros.innerHTML = itens.map(function (it) {
      var on = it.id === ativo;
      return '<button type="button" data-filtro="' + it.id + '" class="px-space-md py-2 rounded-full border font-label-md text-label-md transition-colors cursor-pointer ' +
        (on ? "bg-primary-container text-on-primary-container border-primary-container"
            : "border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary") +
        '">' + it.nome + "</button>";
    }).join("");
  }

  function cardProduto(p) {
    var nome = nomeDe(p);
    return '<article class="group bg-surface border border-outline-variant rounded overflow-hidden hover:shadow-md hover:border-primary-container transition-all duration-200 flex flex-col">' +
      '<button type="button" data-prod="' + p.id + '" class="block w-full text-left cursor-pointer">' +
        '<div class="aspect-[3/4] bg-surface-variant border-b border-outline-variant flex items-center justify-center p-space-md text-center overflow-hidden">' + midia(p, nome) + "</div>" +
        '<div class="p-space-md pb-space-sm">' +
          '<span class="text-label-sm font-label-sm text-secondary uppercase tracking-widest block">' + catNome(p.categoria) + "</span>" +
          '<h4 class="font-headline-sm text-headline-sm text-on-surface">' + nome + "</h4>" +
          '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + precoTxt(p) + "</p>" +
        "</div>" +
      "</button>" +
      '<div class="px-space-md pb-space-md mt-auto">' +
        '<button type="button" data-add="' + p.id + '" class="w-full inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider py-2.5 rounded hover:bg-primary hover:text-surface transition-colors cursor-pointer">' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle><path d="M6 6L5 3H2"></path></svg>' +
          "<span>Adicionar</span></button>" +
      "</div>" +
    "</article>";
  }

  function renderGrade() {
    if (!grade) return;
    var lista = prods.filter(function (p) { return ativo === "todas" || p.categoria === ativo; });
    grade.innerHTML = lista.map(cardProduto).join("");
    if (vazio) vazio.classList.toggle("hidden", lista.length > 0);
  }

  // ---------- Carrinho ----------
  var CART_KEY = "loja_maiara_cart";
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }

  var cartBtn = document.getElementById("cartBtn");
  var cartCount = document.getElementById("cartCount");
  var cartDrawer = document.getElementById("cartDrawer");
  var cartOverlay = document.getElementById("cartOverlay");
  var cartItems = document.getElementById("cartItems");
  var cartEmpty = document.getElementById("cartEmpty");
  var cartTotalRow = document.getElementById("cartTotalRow");
  var cartTotal = document.getElementById("cartTotal");
  var cartWa = document.getElementById("cartWa");

  function salvar() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
  function prodsById(id) { return prods.filter(function (p) { return p.id === id; })[0]; }

  function addItem(id) {
    var p = prodsById(id);
    if (!p) return;
    var found = cart.filter(function (it) { return it.id === id; })[0];
    if (found) found.qty++;
    else cart.push({ id: id, nome: p.nome || "", categoria: p.categoria, preco: p.preco == null ? null : p.preco, qty: 1 });
    salvar(); renderCart(); abrirCart();
  }
  function setQty(id, qty) {
    var it = cart.filter(function (x) { return x.id === id; })[0];
    if (!it) return;
    it.qty = qty;
    if (it.qty < 1) cart = cart.filter(function (x) { return x.id !== id; });
    salvar(); renderCart();
  }
  function totalCart() {
    return cart.reduce(function (s, it) { return s + (it.preco == null ? 0 : it.preco * it.qty); }, 0);
  }
  function temPreco() { return cart.some(function (it) { return it.preco != null; }); }

  function renderCart() {
    var count = cart.reduce(function (s, it) { return s + it.qty; }, 0);
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.classList.toggle("hidden", count === 0);
      cartCount.classList.toggle("flex", count > 0);
    }
    if (!cartItems) return;
    if (cart.length === 0) {
      cartItems.innerHTML = "";
      if (cartEmpty) cartEmpty.classList.remove("hidden");
      if (cartTotalRow) cartTotalRow.classList.add("hidden");
      if (cartWa) { cartWa.classList.add("opacity-50", "pointer-events-none"); cartWa.setAttribute("href", "#"); }
      return;
    }
    if (cartEmpty) cartEmpty.classList.add("hidden");
    cartItems.innerHTML = cart.map(function (it) {
      return '<div class="flex items-center gap-space-md border-b border-outline-variant pb-space-md">' +
        '<div class="w-16 h-20 shrink-0 bg-surface-variant border border-outline-variant rounded flex items-center justify-center text-[9px] text-on-surface-variant text-center px-1">Foto</div>' +
        '<div class="flex-1 min-w-0">' +
          '<h4 class="font-headline-sm text-headline-sm text-on-surface truncate">' + (it.nome || "Nome em breve") + "</h4>" +
          '<span class="text-label-sm font-label-sm text-secondary uppercase tracking-widest block">' + catNome(it.categoria) + "</span>" +
          '<span class="text-body-sm font-body-sm text-on-surface-variant">' + (it.preco == null ? "Preço em breve" : "R$ " + fmt(it.preco)) + "</span>" +
        "</div>" +
        '<div class="flex items-center gap-1">' +
          '<button type="button" data-qty="-1" data-id="' + it.id + '" class="w-7 h-7 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container cursor-pointer">−</button>' +
          '<span class="w-6 text-center font-label-md text-label-md">' + it.qty + "</span>" +
          '<button type="button" data-qty="1" data-id="' + it.id + '" class="w-7 h-7 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container cursor-pointer">+</button>' +
        "</div>" +
        '<button type="button" data-del="' + it.id + '" class="text-outline hover:text-error cursor-pointer" aria-label="Remover">' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>' +
      "</div>";
    }).join("");
    if (cartTotalRow) cartTotalRow.classList.toggle("hidden", !temPreco());
    if (cartTotal) cartTotal.textContent = temPreco() ? "R$ " + fmt(totalCart()) : "A combinar";
    if (cartWa) { cartWa.classList.remove("opacity-50", "pointer-events-none"); cartWa.setAttribute("href", buildWaHref()); }
  }

  function buildMensagem() {
    var comPreco = cart.filter(function (it) { return it.preco != null; });
    var semPreco = cart.filter(function (it) { return it.preco == null; });
    var l = [];
    l.push("*PEDIDO — Loja Maiara Menezes*");
    l.push("");
    l.push("Olá! Gostaria de fazer este pedido:");
    l.push("");
    cart.forEach(function (it, i) {
      var nome = it.nome || "Peça a definir";
      l.push((i + 1) + ". *" + it.qty + "x " + nome + "*");
      l.push(it.preco != null
        ? "   R$ " + fmt(it.preco) + " cada  ·  Subtotal: R$ " + fmt(it.preco * it.qty)
        : "   Valor a combinar");
      l.push("");
    });
    if (semPreco.length === 0) {
      l.push("*TOTAL: R$ " + fmt(totalCart()) + "*");
    } else if (comPreco.length === 0) {
      l.push("*TOTAL: a combinar*");
    } else {
      l.push("*SUBTOTAL: R$ " + fmt(totalCart()) + "*  (+ " + semPreco.length + " item(ns) a combinar)");
    }
    l.push("");
    l.push("Aguardo a confirmação. Obrigado(a)!");
    return l.join("\n");
  }
  function buildWaHref() {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(buildMensagem());
  }

  function abrirCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("translate-x-full");
    cartDrawer.setAttribute("aria-hidden", "false");
    if (cartOverlay) cartOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function fecharCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add("translate-x-full");
    cartDrawer.setAttribute("aria-hidden", "true");
    if (cartOverlay) cartOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ---------- Modal ----------
  var modal = document.getElementById("modalProduto");
  var modalAddId = null;

  function abrirModal(id) {
    var p = prodsById(id);
    if (!p || !modal) return;
    var nome = nomeDe(p);
    modalAddId = id;
    document.getElementById("modalCategoria").textContent = catNome(p.categoria);
    document.getElementById("modalTitulo").textContent = nome;
    document.getElementById("modalDesc").textContent = p.desc || "Informações desta peça em breve.";
    document.getElementById("modalPreco").textContent = precoTxt(p);
    document.getElementById("modalMidia").innerHTML = midia(p, nome);
    modal.classList.remove("hidden"); modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
  function fecharModal() {
    if (!modal) return;
    modal.classList.add("hidden"); modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  // ---------- Eventos ----------
  if (filtros) filtros.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filtro]"); if (!b) return;
    ativo = b.getAttribute("data-filtro"); renderFiltros(); renderGrade();
  });
  if (grade) grade.addEventListener("click", function (e) {
    var add = e.target.closest("[data-add]");
    if (add) { addItem(add.getAttribute("data-add")); return; }
    var b = e.target.closest("[data-prod]"); if (!b) return; abrirModal(b.getAttribute("data-prod"));
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-cat]"), function (el) {
    function ir() {
      ativo = el.getAttribute("data-cat"); renderFiltros(); renderGrade();
      var sec = document.getElementById("loja"); if (sec) sec.scrollIntoView({ behavior: "smooth" });
    }
    el.addEventListener("click", ir);
    el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ir(); } });
  });

  var modalAddBtn = document.getElementById("modalAdd");
  if (modalAddBtn) modalAddBtn.addEventListener("click", function () {
    if (modalAddId) { fecharModal(); addItem(modalAddId); }
  });
  var mFechar = document.getElementById("modalFechar");
  var mFundo = document.getElementById("modalFundo");
  if (mFechar) mFechar.addEventListener("click", fecharModal);
  if (mFundo) mFundo.addEventListener("click", fecharModal);

  if (cartBtn) cartBtn.addEventListener("click", abrirCart);
  var cartClose = document.getElementById("cartClose");
  if (cartClose) cartClose.addEventListener("click", fecharCart);
  if (cartOverlay) cartOverlay.addEventListener("click", fecharCart);
  if (cartItems) cartItems.addEventListener("click", function (e) {
    var q = e.target.closest("[data-qty]");
    if (q) {
      var id = q.getAttribute("data-id");
      var it = cart.filter(function (x) { return x.id === id; })[0];
      if (it) setQty(id, it.qty + Number(q.getAttribute("data-qty")));
      return;
    }
    var d = e.target.closest("[data-del]");
    if (d) setQty(d.getAttribute("data-del"), 0);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { fecharModal(); fecharCart(); }
  });

  renderFiltros();
  renderGrade();
  renderCart();
})();

// ===== Menu mobile =====
(function () {
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("menuMobile");
  if (!toggle || !menu) return;
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  toggle.addEventListener("click", function () { setOpen(menu.classList.contains("hidden")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
  window.addEventListener("resize", function () { if (window.innerWidth >= 1024 && !menu.classList.contains("hidden")) setOpen(false); });
})();
