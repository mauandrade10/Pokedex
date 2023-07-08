const pokemonContainer = document.querySelector('.pokemon-container');
const input = document.querySelector('#input');
const form = document.querySelector('#search-form');

const inputName = document.querySelector('#input-name');
const formName = document.querySelector('#search-form-name');

const previous = document.querySelector('#previous')
const next = document.querySelector('#next');
let firstPokemon = 1;

//-------------------------- Fetch Pokemones por id -------------------------//


function searchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        printPokemon(data);
    });
}

//-------------------------- Fetch Pokemones por nombre -------------------------//


function searchPokemonName(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((res) => res.json())
    .then((data) => {
        printPokemon(data);
    });
}

//-------------------------- Buscar 6 Pokemones -------------------------//

function searchPokemons(number){
    let x = number;
    for(let i = 1; i <= 6; i++){
        searchPokemon(x);
        x++;
    }
}

function searchPokemonsName(name){
    for(let i = 1; i <= 6; i++){
        searchPokemonName(name);
        x++;
    }
}

//-------------------------- Imprimir Pokemones -------------------------//

function printPokemon(pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add('card-container-front');

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;

    imgContainer.appendChild(img);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id}`;

    const name = document.createElement('p');
    name.textContent = pokemon.name;
    
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(imgContainer);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-container-back');
    cardBack.appendChild(infoPokemon(pokemon));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

//-------------------------- Buscar Pokemon -------------------------//

searchPokemons(1);

form.addEventListener('submit', searchPokemonId);

function searchPokemonId(event){
    event.preventDefault();
    id = input.value;
    deleteInformation();
    if(id>0){
        searchPokemon(id);
    }
    else{
        searchPokemons(1)
        firstPokemon = 1;
    }
}

//-------------------------- Buscar Pokemon por nombre -------------------------//


formName.addEventListener('submit', searchPokemonNames);

function searchPokemonNames(event){
    event.preventDefault();
    const name = inputName.value.toLowerCase();
    deleteInformation();

    if(name){
    searchPokemonName(name);
    }
    else{
        searchPokemons(1)
        firstPokemon = 1;
    }
}



//-------------------------- Eliminar información -------------------------//

function deleteInformation(){
    while (pokemonContainer.firstChild) {
        pokemonContainer.removeChild(pokemonContainer.firstChild);
      }
};

//-------------------------- Cambiar pagina -------------------------//

previous.addEventListener('click', () =>{
    if(firstPokemon>6){
        deleteInformation();
        firstPokemon = firstPokemon - 6;
        searchPokemons(firstPokemon)
    }
});

next.addEventListener('click', () =>{
    deleteInformation();
    firstPokemon = firstPokemon + 6;
    searchPokemons(firstPokemon)
});

//-------------------------- Info Pokemon -------------------------//

function infoPokemon(data){

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    const inforTittle = document.createElement('h4');
    inforTittle.textContent = 'INFORMACIÓN';

    const type = document.createElement('p');
    type.textContent = `Tipo: ${data.types[0].type.name}`


    
    infoContainer.appendChild(inforTittle);   
    infoContainer.appendChild(type);

    let tamaño = data.abilities.length

    for (let i = 0; i < tamaño; i++) {
        const abilityName = document.createElement("p");
        abilityName.textContent = `Habilidad ${i+1}: ${data.abilities[i].ability.name}`;
        infoContainer.appendChild(abilityName);
    }
    return infoContainer
}