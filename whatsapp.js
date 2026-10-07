const fs = require("fs");
const dir = "C:/Users/Gabriel/Desktop/projetos/Loja-Maiara-Menezes";
let s = fs.readFileSync(dir + "/index.html", "utf8");

const NUM = "(33) 8838-3522";
const WA = "https://wa.me/553388383522?text=Ol%C3%A1%21%20Quero%20ver%20as%20pe%C3%A7as%20da%20Loja%20Maiara%20Menezes.";
const WAICON = '<svg class="%CLS%" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';

function block(str, start, end, repl) {
  const i = str.indexOf(start);
  if (i < 0) { console.log("NAO ACHOU:", start.slice(0, 45)); return str; }
  const j = str.indexOf(end, i);
  if (j < 0) { console.log("NAO ACHOU fim para:", start.slice(0, 45)); return str; }
  return str.slice(0, i) + repl + str.slice(j + end.length);
}

// 1) HERO: botao "WhatsApp em breve" -> link real
s = block(
  s,
  '<button class="px-space-xl py-3.5 border border-primary-container',
  "</button>",
  '<a class="px-space-xl py-3.5 bg-tertiary-container hover:bg-tertiary text-on-tertiary text-label-lg font-label-lg rounded transition-all duration-200 uppercase tracking-widest inline-flex items-center gap-space-xs shadow-md active:scale-95" href="' + WA + '" target="_blank" rel="noopener">' +
    WAICON.replace("%CLS%", "w-4 h-4 text-on-tertiary") +
    "<span>Falar no WhatsApp</span></a>"
);

// 2) FLOATING button -> link WhatsApp real
s = block(
  s,
  "<!-- FLOATING ACTION BUTTON",
  '<script src="produtos.js">',
  '<!-- FLOATING WHATSAPP BUTTON -->\n' +
    '<a class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-space-lg py-3 bg-tertiary-container text-on-tertiary shadow-lg rounded-full hover:bg-tertiary transition-all duration-200 active:scale-95" href="' + WA + '" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">\n' +
    '<span class="w-8 h-8 rounded-full bg-surface/20 flex items-center justify-center">' + WAICON.replace("%CLS%", "w-5 h-5") + "</span>\n" +
    '<span class="hidden sm:inline font-label-md text-label-md tracking-wider uppercase">WhatsApp</span>\n' +
    "</a>\n" +
    '<script src="produtos.js">'
);

// 3) CONTATO: item WhatsApp -> numero real
s = s.replace(
  '<span class="bg-secondary-container text-on-secondary-container text-[11px] font-label-sm px-2 py-0.5 rounded uppercase">Em breve</span>',
  '<span class="bg-tertiary-container text-on-tertiary-container text-[11px] font-label-sm px-2 py-0.5 rounded uppercase">Ativo</span>'
);
s = s.replace(
  /<p class="font-body-sm text-body-sm text-on-surface-variant">\s*Linha de canal[^<]*<\/p>/,
  '<p class="font-body-sm text-body-sm text-on-surface-variant">Fale com a gente no WhatsApp: <a class="text-primary font-semibold" href="' + WA + '" target="_blank" rel="noopener">' + NUM + "</a></p>"
);
s = s.replace(
  /<span class="text-label-sm font-label-sm text-outline">Canal em prepara[^<]*<\/span>/,
  '<a class="text-label-sm font-label-sm text-primary font-semibold" href="' + WA + '" target="_blank" rel="noopener">Chamar no WhatsApp \u2192</a>'
);

// 4) MODAL: CTA -> WhatsApp
s = block(
  s,
  '<a id="modalCta"',
  "</a>",
  '<a id="modalCta" href="' + WA + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-tertiary-container text-on-tertiary font-label-lg text-label-lg px-space-lg py-space-sm rounded-full hover:bg-tertiary transition-colors">' +
    WAICON.replace("%CLS%", "w-4 h-4") +
    "<span>Comprar no WhatsApp</span></a>"
);

// 5) MENU MOBILE: CTA do rodape do menu -> WhatsApp
s = block(
  s,
  '<a class="inline-flex items-center justify-center gap-space-xs px-space-xl py-3 bg-primary-container text-surface rounded-full text-label-lg',
  "</a>",
  '<a class="inline-flex items-center justify-center gap-space-xs px-space-xl py-3 bg-tertiary-container text-on-tertiary rounded-full text-label-lg font-label-lg uppercase tracking-wider active:scale-95" href="' + WA + '" target="_blank" rel="noopener">' +
    WAICON.replace("%CLS%", "w-4 h-4 text-on-tertiary") +
    "<span>Falar no WhatsApp</span></a>"
);

fs.writeFileSync(dir + "/index.html", s);

const restEmBreve = (s.match(/WhatsApp em breve/g) || []).length;
console.log("WhatsApp em breve restantes:", restEmBreve);
console.log("links wa.me:", (s.match(/wa\.me\/553388383522/g) || []).length);
console.log("numero exibido:", (s.match(/\(33\) 8838-3522/g) || []).length);
