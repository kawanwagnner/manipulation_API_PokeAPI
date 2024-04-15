const main = document.querySelector(".container");

async function getPokemon() {
  // Fazendo uma requisição para a PokeAPI para obter dados de Pokémon
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  // Convertendo a resposta para JSON
  const data = await response.json();

  // Chamando a função para criar os cards
  createPokemonCards(data.results);
}

function createPokemonCards(pokemonArray) {
  // Iterando sobre o array de Pokémon
  pokemonArray.forEach(async (pokemon) => {
    // Fazendo uma nova requisição para obter dados detalhados do Pokémon
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();

    // Obtendo a URL da imagem animada do Pokémon
    const animatedImageUrl =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated
        .front_default;

    // Criando o card HTML para o Pokémon
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="banner"></div>
      <div class="content">
        <div class="img-profile">
          <img class="img" src="${animatedImageUrl}" alt="${
      pokemonData.name
    }" />
        </div>
        <div class="texts">
          <h3 class="name">${pokemonData.name}</h3>
          <h5 class="species">Tipo: ${pokemonData.types
            .map((type) => type.type.name)
            .join(", ")}</h5>
          <div class="flex-status">
            <h4 class="life">Altura: ${pokemonData.height}</h4>
            <h4 class="gener">Peso: ${pokemonData.weight}</h4>
          </div>
        </div>
      </div>
    `;
    // Adicionando o card ao elemento principal
    main.appendChild(card);
  });
}


// Chamando a função principal para buscar e exibir os Pokémon
getPokemon();

const main2 = document.querySelector(".container");
const backButton = document.querySelector(".button2:nth-child(1)");
const nextButton = document.querySelector(".button2:nth-child(2)");

let currentPage = 1;

async function getPokemon(page) {
  // Fazendo uma requisição para a PokeAPI para obter dados de Pokémon da página especificada
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
  );

  // Convertendo a resposta para JSON
  const data = await response.json();

  // Chamando a função para criar os cards
  createPokemonCards(data.results);
}

function createPokemonCards(pokemonArray) {
  // Removendo os cards anteriores
  main2.innerHTML = "";

  // Iterando sobre o array de Pokémon
  pokemonArray.forEach(async (pokemon) => {
    // Fazendo uma nova requisição para obter dados detalhados do Pokémon
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();

    // Obtendo a URL da imagem animada do Pokémon
    const animatedImageUrl =
      pokemonData.sprites.versions["generation-v"]["black-white"].animated
        .front_default;

    // Criando o card HTML para o Pokémon
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="banner"></div>
      <div class="content">
        <div class="img-profile">
          <img src="${animatedImageUrl}" alt="${pokemonData.name}" />
        </div>
        <div class="texts">
          <h3 class="name">${pokemonData.name}</h3>
          <h5 class="species">Type: ${pokemonData.types
            .map((type) => type.type.name)
            .join(", ")}</h5>
          <div class="flex-status">
            <h4 class="life">Height: ${pokemonData.height}</h4>
            <h4 class="gener">Weight: ${pokemonData.weight}</h4>
          </div>
        </div>
      </div>
    `;
    // Adicionando o card ao elemento principal
    main2.appendChild(card);
  });
}

// Event listeners para os botões de navegação
backButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getPokemon(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  getPokemon(currentPage);
});

// Chamando a função principal para buscar e exibir os Pokémon da primeira página
getPokemon(currentPage);

