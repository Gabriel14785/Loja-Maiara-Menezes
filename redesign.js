const fs = require("fs");
const dir = "C:/Users/Gabriel/Desktop/projetos/Loja-Maiara-Menezes";
let s = fs.readFileSync(dir + "/index.html", "utf8");
const header = fs.readFileSync(dir + "/_partials/header.html", "utf8");

// 1) troca todo o header (inclui o menu mobile antigo)
const start = s.indexOf("<!-- TOP APP BAR -->");
const endTag = "</header>";
const end = s.indexOf(endTag);
if (start >= 0 && end > start) {
  s = s.slice(0, start) + header.trim() + "\n" + s.slice(end + endTag.length);
  console.log("header substituido: ok");
} else {
  console.log("ERRO: header nao encontrado (start=" + start + ", end=" + end + ")");
}

// 2) categorias: 2 colunas no mobile (era 1) e gaps menores
const gridOld = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg';
const gridNew = 'grid grid-cols-2 lg:grid-cols-3 gap-space-sm md:gap-space-lg';
if (s.indexOf(gridOld) >= 0) {
  s = s.split(gridOld).join(gridNew);
  console.log("grid de categorias: 2 colunas no mobile");
} else {
  console.log("AVISO: classe do grid de categorias nao encontrada");
}

fs.writeFileSync(dir + "/index.html", s);
console.log("menuToggle:", /id="menuToggle"/.test(s), "| menuMobile:", /id="menuMobile"/.test(s));
console.log("chips de categoria no menu:", (s.match(/data-cat="/g) || []).length);
console.log("nav desktop itens:", (s.match(/href="#(inicio|colecao|loja|a-loja|contato)"/g) || []).length);
