const characters = Array.from({ length: 40 }, (_, i) => ({
    name: `Personaje ${i + 1}`,
    role: "Operador",
    image: "https://via.placeholder.com/100"
}));

const CARDS_PER_PAGE = 9; // 3 columnas x 3 filas

const container = document.querySelector(".pdf-container");

function createPage(pageNumber) {
    const page = document.createElement("div");
    page.className = "pdf-page";

    page.innerHTML = `
    <header class="pdf-header">
      <h1>Listado de Personajes</h1>
      <div class="subtitle">Reporte Oficial</div>
    </header>
    <section class="cards-container"></section>
    <footer class="pdf-footer">
      Página ${pageNumber}
    </footer>
  `;

    container.appendChild(page);
    return page.querySelector(".cards-container");
}

let currentPage;
let pageNumber = 1;

characters.forEach((character, index) => {

    if (index % CARDS_PER_PAGE === 0) {
        currentPage = createPage(pageNumber++);
    }

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <img src="${character.image}" />
    <h3>${character.name}</h3>
    <p>${character.role}</p>
  `;

    currentPage.appendChild(card);
});