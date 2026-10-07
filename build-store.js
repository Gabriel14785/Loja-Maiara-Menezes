const fs = require("fs");
const dir = "C:/Users/Gabriel/Desktop/projetos/Loja-Maiara-Menezes";

let s = fs.readFileSync(dir + "/index.html", "utf8");
const partial = fs.readFileSync(dir + "/_partials/loja.html", "utf8");

function esc(r) { return r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// 1) torna os cards de categoria clicaveis (data-cat)
const cardClass = '<div class="bg-surface border border-outline-variant rounded p-space-lg flex flex-col justify-between hover:border-primary-container transition-all duration-200 group shadow-sm hover:shadow-md">';
const slugs = ["vestidos", "blusas", "calcas", "botas", "chapeus", "acessorios"];
let idx = 0;
s = s.replace(new RegExp(esc(cardClass), "g"), function () {
  const slug = slugs[idx++] || "";
  return '<div data-cat="' + slug + '" tabindex="0" role="button" class="cursor-pointer bg-surface border border-outline-variant rounded p-space-lg flex flex-col justify-between hover:border-primary-container transition-all duration-200 group shadow-sm hover:shadow-md">';
});

// 2) troca a secao GALERIA (nomes de produto inventados) pela secao LOJA + modal
const startMark = "<!-- SECTION 4: GALERIA -->";
const endMark = "<!-- SECTION 5:";
const i = s.indexOf(startMark);
const j = s.indexOf(endMark);
if (i >= 0 && j > i) {
  s = s.slice(0, i) + partial.trim() + "\n" + s.slice(j);
  console.log("galeria -> loja: ok");
} else {
  console.log("ERRO: marcadores da galeria nao encontrados (i=" + i + ", j=" + j + ")");
}

// 3) suaviza alegacoes inventadas pelo Stitch
s = s.replace(/Couro Leg[^<]*/g, "Estilo Country");
s = s.replace(/detalhes bordados[^<]*/g, "detalhes que fazem a diferen\u00e7a");
s = s.replace(/fivelas banhadas[^<]*/g, "fivelas trabalhadas, bolsas e len\u00e7os");

// 4) injeta os scripts da loja
s = s.replace(/<\/body>/, '<script src="produtos.js"></script>\n<script src="app.js"></script>\n</body>');

fs.writeFileSync(dir + "/index.html", s);

// diagnosticos
console.log("data-cat adicionados:", (s.match(/data-cat=/g) || []).length);
console.log("secao loja presente:", /id="loja"/.test(s));
console.log("modal presente:", /id="modalProduto"/.test(s));
console.log("scripts presentes:", /produtos\.js/.test(s) && /app\.js/.test(s));
console.log("nomes inventados restantes:", (s.match(/Conjunto Camur|Bota Cano M|Cinto Western|Chap\u00e9u Feltro/g) || []).length);
console.log("tamanho final:", s.length);
