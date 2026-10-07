/* ============================================================
   Dados da Loja Maiara Menezes
   ------------------------------------------------------------
   Preencha "produtos" com as pecas reais. Enquanto estiver
   vazio, a loja mostra espacos reservados ("Em breve").

   Exemplo de item:
   { id: "v1", nome: "Vestido Xadrez Country", categoria: "vestidos",
     preco: 189.9, foto: "img/vestido-xadrez.jpg", desc: "Tecido leve..." }

   - categoria: use um dos ids de "categorias" abaixo
   - preco: numero (ex.: 189.9) ou null para "Preco em breve"
   - foto: caminho relativo (ex.: "img/arquivo.jpg") ou null
   ============================================================ */
window.LOJA = {
  categorias: [
    { id: "vestidos",   nome: "Vestidos" },
    { id: "blusas",     nome: "Blusas" },
    { id: "calcas",     nome: "Cal\u00e7as" },
    { id: "botas",      nome: "Botas" },
    { id: "chapeus",    nome: "Chap\u00e9us" },
    { id: "acessorios", nome: "Acess\u00f3rios" }
  ],
  produtos: []
};
