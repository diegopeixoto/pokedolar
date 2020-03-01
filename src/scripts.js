const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');


app.appendChild(container);



const getDollar = async () => {
  try {
    return await axios.get('https://economia.awesomeapi.com.br/all/USD')
  } catch (error) {
    console.error(error)
  }
}

const getPokemon = async (pokemon) => {
  try {
    return await axios.get('https://pokeapi.co/api/v2/pokemon-form/'+pokemon)
  } catch (error) {
    console.error(error)
  }
}

const catchPokemon = async () => {
  const dollar = await getDollar()

    // dollarBid = parseFloat(dollar.data.USD.bid)
    dollarBid = 1.80;
    dollarBid = dollarBid.toFixed(2)
    pokemonId = dollarBid.substring(0,1)+dollarBid.substring(2,4) 
    
  
    const pokemon = await getPokemon(pokemonId)
    pokemonName = pokemon.data.pokemon.name
    pokemonSprite = pokemon.data.sprites.front_default
  
  
    const sprite = document.createElement('img');
    sprite.src = pokemonSprite;
    const pokemonH1 = document.createElement('h1');
    pokemonH1.textContent = "Dolar: R$ "+dollarBid+" Pokémon: "+pokemonName;
  
    app.appendChild(sprite);
    app.appendChild(pokemonH1);  
    
    
  
}

catchPokemon()

