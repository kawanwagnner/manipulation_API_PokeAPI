const main = document.querySelector(".container");
const backButton = document.querySelector(".button2");
const nextButton = document.querySelector(".button1");

let currentPage = 1;
const cardsPerPage = 8; 

async function getPokemon(page) {

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage}&offset=${startIndex}`);


  const data = await response.json();


  createPokemonCards(data.results);
}

async function createPokemonCards(pokemonArray) {

  main.innerHTML = "";


  for (const pokemon of pokemonArray) {
    
    const response = await fetch(pokemon.url);
    const pokemonData = await response.json();

    const animatedImageUrl = getAnimatedImageUrl(pokemonData);

    
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
  
    main.appendChild(card);
  }
}

function getAnimatedImageUrl(pokemonData) {

  if (pokemonData.sprites.versions["generation-v"]) {
    return pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_default;
  } else if (pokemonData.sprites.versions["generation-vi"]) {
    return pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].animated.front_default;
  } else if (pokemonData.sprites.versions["generation-vii"]) {
    return pokemonData.sprites.versions["generation-vii"]["icons"].front_default;
  } else if (pokemonData.sprites.versions["generation-viii"]) {
    return pokemonData.sprites.versions["generation-viii"]["icons"].front_default;
  } else {
    return pokemonData.sprites.front_default;
  }
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
