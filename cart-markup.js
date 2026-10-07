const fs = require("fs");
const dir = "C:/Users/Gabriel/Desktop/projetos/Loja-Maiara-Menezes";
let s = fs.readFileSync(dir + "/index.html", "utf8");

const CART_ICON = '<svg class="w-%S%" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle><path d="M6 6L5 3H2"></path></svg>';
const WA_ICON = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

// 1) botao do carrinho no header (antes do hamburguer)
if (s.indexOf('id="cartBtn"') < 0) {
  const cartBtn =
    '<button id="cartBtn" type="button" class="relative inline-flex items-center justify-center w-10 h-10 rounded border border-outline-variant text-primary-container hover:bg-surface-container transition-colors cursor-pointer" aria-label="Abrir carrinho">' +
    CART_ICON.replace("%S%", "5 h-5") +
    '<span id="cartCount" class="hidden absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-tertiary-container text-on-tertiary text-[10px] font-label-sm items-center justify-center">0</span>' +
    "</button>\n";
  s = s.replace('<button id="menuToggle"', cartBtn + '<button id="menuToggle"');
  console.log("botao carrinho inserido");
}

// 2) botao "Adicionar ao carrinho" no modal (antes do #modalCta)
if (s.indexOf('id="modalAdd"') < 0) {
  const modalAdd =
    '<button id="modalAdd" type="button" class="w-full mb-space-sm inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-label-lg text-label-lg px-space-lg py-space-sm rounded-full hover:bg-primary hover:text-surface transition-colors cursor-pointer">' +
    CART_ICON.replace("%S%", "4 h-4") +
    "<span>Adicionar ao carrinho</span></button>\n";
  s = s.replace('<a id="modalCta"', modalAdd + '<a id="modalCta"');
  console.log("botao add no modal inserido");
}

// 3) gaveta do carrinho (antes dos scripts)
if (s.indexOf('id="cartDrawer"') < 0) {
  const drawer =
    '<!-- CARRINHO -->\n' +
    '<div id="cartOverlay" class="fixed inset-0 z-[70] hidden bg-black/50"></div>\n' +
    '<aside id="cartDrawer" class="fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-surface border-l border-outline-variant shadow-xl flex flex-col translate-x-full transition-transform duration-300" aria-label="Carrinho" aria-hidden="true">\n' +
    '<header class="flex items-center justify-between px-space-lg py-space-md border-b border-outline-variant">\n' +
    '<h2 class="font-headline-md text-headline-md text-on-surface">Seu pedido</h2>\n' +
    '<button id="cartClose" type="button" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-surface transition-colors cursor-pointer" aria-label="Fechar carrinho">\n' +
    '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewbox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>\n</button>\n</header>\n' +
    '<div id="cartItems" class="flex-1 overflow-y-auto px-space-lg py-space-md flex flex-col gap-space-md"></div>\n' +
    '<footer class="border-t border-outline-variant px-space-lg py-space-md flex flex-col gap-space-sm">\n' +
    '<p id="cartEmpty" class="text-center text-on-surface-variant font-body-sm text-body-sm py-space-lg">Seu carrinho está vazio. Adicione peças pra montar seu pedido.</p>\n' +
    '<div id="cartTotalRow" class="hidden flex items-center justify-between font-label-lg text-label-lg text-on-surface"><span>Total</span><span id="cartTotal">—</span></div>\n' +
    '<a id="cartWa" class="inline-flex items-center justify-center gap-2 bg-tertiary-container text-on-tertiary font-label-lg text-label-lg px-space-lg py-3 rounded-full uppercase tracking-wider hover:bg-tertiary transition-colors" href="#" target="_blank" rel="noopener">' +
    WA_ICON +
    "<span>Enviar pedido no WhatsApp</span></a>\n" +
    '<p class="text-[11px] text-on-surface-variant text-center leading-snug">Sem pagamento online — o pedido é combinado direto no WhatsApp.</p>\n' +
    "</footer>\n</aside>\n";
  s = s.replace('<script src="produtos.js">', drawer + '<script src="produtos.js">');
  console.log("gaveta do carrinho inserida");
}

fs.writeFileSync(dir + "/index.html", s);
console.log("cartBtn:", /id="cartBtn"/.test(s), "| modalAdd:", /id="modalAdd"/.test(s), "| cartDrawer:", /id="cartDrawer"/.test(s));
