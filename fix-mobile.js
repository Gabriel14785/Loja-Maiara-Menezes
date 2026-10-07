const fs = require("fs");
const dir = "C:/Users/Gabriel/Desktop/projetos/Loja-Maiara-Menezes";
let s = fs.readFileSync(dir + "/index.html", "utf8");
const IG = "https://www.instagram.com/loja_maiaramenezes/";

// 1) CTAs que apontavam para o instagram generico
const antesIG = (s.match(/"https:\/\/instagram\.com"/g) || []).length;
s = s.split('"https://instagram.com"').join('"' + IG + '"');

// 2) header row responsivo (altura e padding)
s = s.replace(
  'class="w-full px-gutter-desktop mx-auto max-w-[1440px] flex items-center justify-between h-20"',
  'class="w-full px-gutter lg:px-gutter-desktop mx-auto max-w-[1440px] flex items-center justify-between gap-space-md h-16 lg:h-20"'
);

// 3) nav aparece so no desktop (lg), nao em md
s = s.replace(
  '<nav class="hidden md:flex items-center gap-space-xl">',
  '<nav class="hidden lg:flex items-center gap-space-xl">'
);

// 4) esconde o texto do CTA do topo em telas minusculas
s = s.replace('<span>Ver Instagram</span>', '<span class="hidden sm:inline">Ver Instagram</span>');

// 5) insere o botao hamburguer dentro do container de acoes do header
const acoesAbre = '<div class="flex items-center gap-space-md">';
const ai = s.indexOf(acoesAbre);
if (ai >= 0) {
  let depth = 0, end = -1;
  for (let i = ai; i < s.length; i++) {
    if (s.startsWith("<div", i)) depth++;
    else if (s.startsWith("</div>", i)) { depth--; if (depth === 0) { end = i; break; } }
  }
  const hamburger =
    '<button id="menuToggle" type="button" class="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-outline-variant text-primary-container hover:bg-surface-container transition-colors cursor-pointer" aria-label="Abrir menu" aria-expanded="false" aria-controls="menuMobile">\n' +
    '<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.75" viewbox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>\n' +
    "</button>\n";
  if (end > 0) { s = s.slice(0, end) + hamburger + s.slice(end); console.log("hamburguer inserido"); }
  else console.log("ERRO: fim do container de acoes nao encontrado");
} else console.log("ERRO: container de acoes nao encontrado");

// 6) painel do menu mobile, antes de </header>
const menuMobile =
  '<div id="menuMobile" class="lg:hidden hidden border-t border-outline-variant bg-surface">\n' +
  '<nav class="px-gutter py-space-md flex flex-col">\n' +
  '<a class="py-space-sm border-b border-outline-variant text-on-surface font-label-md text-label-md" href="#inicio">In\u00edcio</a>\n' +
  '<a class="py-space-sm border-b border-outline-variant text-on-surface font-label-md text-label-md" href="#colecao">Cole\u00e7\u00e3o</a>\n' +
  '<a class="py-space-sm border-b border-outline-variant text-on-surface font-label-md text-label-md" href="#a-loja">A Loja</a>\n' +
  '<a class="py-space-sm border-b border-outline-variant text-on-surface font-label-md text-label-md" href="#contato">Contato</a>\n' +
  '<a class="py-space-sm text-secondary font-label-md text-label-md" href="' + IG + '" target="_blank" rel="noopener">Ver Instagram</a>\n' +
  "</nav>\n</div>\n";
s = s.replace("</header>", menuMobile + "</header>");

fs.writeFileSync(dir + "/index.html", s);

console.log("links instagram genericos corrigidos:", antesIG);
console.log("menuToggle:", /id="menuToggle"/.test(s), "| menuMobile:", /id="menuMobile"/.test(s));
console.log("nav lg:flex:", /hidden lg:flex/.test(s));
