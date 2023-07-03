const data = [
    {
        id: 1,
        name: "Arena Bastos",
        img: "images/ArenaBastos.png",
        cidade: "Itapajé",
        NQ: "3",
    },

    {
        id: 2,
        name: "Society Nobisagol",
        img: "images/ArenaNobisa.png",
        cidade: "Pentecoste",
        NQ: 2,
    },

    {
        id: 3,
        name: "Arena Sport",
        img: "images/ArenaSport.png",
        cidade: "Irauçuba",
        NQ: 2,
    },
    {
        id: 4,
        name: "Arena BETKING",
        img: "images/ArenaBETKING.png",
        cidade: "Fortaleza",
        NQ: 5,  
    },
];

const productsContainer = document.querySelector(".products");
const cidadeList = document.querySelector(".cidade-list");

function displayProducts(products) {
    if (products.length > 0) {
        const product_details = products
            .map(
                (product) => `
    <div class="product">
    <div class="img">
    <a href="arenasel.html">
      <img src="${product.img}" alt="${product.name}" />
    </a>
    </div>
    <div class="product-details">
      <span class="name">${product.name}</span>
      <span class="cidade">Cidade: ${product.cidade}</span>
      <span class="NQ">Quadras: ${product.NQ}</span>
    </div>
  </div>`
            )
            .join("");

        productsContainer.innerHTML = product_details;
    } else {
        productsContainer.innerHTML = "<h3>Sem cadastros nessa cidade!</h3>";
    }
}

function setCidades() {
    const allCidades = data.map((product) => product.cidade);
    //console.log(allCidades);
    const cidades = [
        "Todas",
        ...allCidades.filter((product, index) => {
            return allCidades.indexOf(product) === index;
        }),
    ];
    //console.log(cidades);
    cidadeList.innerHTML = cidades.map((cidade) => `<li>${cidade}</li>`).join("");

    cidadeList.addEventListener("click", (e) => {
        const selectedCidade = e.target.textContent;
        selectedCidade === "Todas" ? displayProducts(data) : displayProducts(data.filter((product) => product.cidade == selectedCidade));
    });
}

const txtSearch = document.querySelector("#txtSearch");
txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
    } else {
        displayProducts(data);
    }
});

displayProducts(data);
setCidades();