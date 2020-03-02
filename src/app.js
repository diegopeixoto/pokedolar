/***
 * PokéDólar Script
 * Developed by Diego Peixoto (https://github.com/diegopeixoto)
 * Using Axios and Native JavaScript
 * Credits to:
 * Awesome API for Dollar Currency API
 * fanzeyi for pokedex.json file
 * © 2020 Pokémon. © 1995–2020 Nintendo/Creatures Inc./GAME FREAK inc.
 */

/* Declare Elements from Frontend */

const pkmName = document.getElementById('pkm-name')
const pkmJapName = document.getElementById('japanese-name')
const pkmSpriteHolder = document.getElementById('pokemon-image')
const pkmTypeContainer = document.getElementById('container-type')
const dollarSpan = document.getElementById('dollar-value')
const hpStat = document.getElementById('hp-stat')
const attackStat = document.getElementById('attack-stat')
const defenseStat = document.getElementById('defense-stat')
const spAttackStat = document.getElementById('sp-attack-stat')
const spDefenseStat = document.getElementById('sp-defense-stat')
const speedStat = document.getElementById('speed-stat')


/* Initial Configuration */

var dollarValue

const imgdir = 'src/img/'
const pkmdir = 'pkm/'

/**
 * Set the Pokémon type on frontend
 * @param {object} type
 */

const setType = (type) => {

  /* Clear the Pokémon Type container div */

  pkmTypeContainer.innerHTML = "";

  /* Fill Pokémon Container with Pokémon Types Badges */

  for (currentType in type) {
    const typeImg = document.createElement('img')
    typeImg.src = 'src/img/types/' + type[currentType]+'.png'
    pkmTypeContainer.appendChild(typeImg)
  }

  /* Change document.body style class to Pokémon type one */

  document.body.className = type[0].toLowerCase()
}

/**
 * Fill Pokémon Stats on frontend
 * @param {object} stats
 */

const setStats = (stats) => {
  hpStat.innerText = stats.HP
  attackStat.innerText = stats.Attack
  defenseStat.innerText = stats.Defense
  spAttackStat.innerText = stats['Sp. Attack']
  spDefenseStat.innerText = stats['Sp. Defense']
  speedStat.innerText = stats.Speed
}


/**
 * Consume Currency API to get Dollar Value
 */

const getDollar = async () => {
  try {
    return await axios.get('https://economia.awesomeapi.com.br/all/USD')
  } catch (error) {
    console.error(error)
  }
}

/**
 * Consume pokedex.json to get Pokémon Data
 */

const getPokemon = async () => {
  try {
    return await axios.get('src/data/pokedex_data.json')
  } catch (error) {
    console.error(error)
  }
}

/**
 * Master Function
 */

const catchPokemon = async () => {

  /* Run getDollar() function */

  const dollar = await getDollar()

    /* Detects if dollarValue are not empty, made for debugging */

    if (!dollarValue) {

      /* Converts received string as float */

      dollarValue = parseFloat(dollar.data.USD.bid)

    }

     /* Round the Dollar Value as it have severals decimals */

    dollarValue = Math.round((dollarValue + Number.EPSILON) * 100) / 100

     /* Parse as String */

    dollarValue = dollarValue.toFixed(2)

     /* Remove the dot(.) on value; Subract PokemonId by 1, since JSON index
     start by 0  */

    pokemonId = dollarValue.substring(0,1)+dollarValue.substring(2,4) - 1
    pokemonSpriteId = dollarValue.substring(0,1)+dollarValue.substring(2,4)

     /* Run getPokemon() function */
    const pokemon = await getPokemon()

      /* fill frontend with Pokémon Data */

      pokemonName = pokemon.data[pokemonId].name.english
      pokemonNameJap = pokemon.data[pokemonId].name.japanese
      pokemonType = pokemon.data[pokemonId].type
      pokemonStats = pokemon.data[pokemonId].base
      pokemonSprite = imgdir+pkmdir+pokemonSpriteId+pokemon.data[pokemonId].
      name.english+'.png'

      setStats(pokemonStats)
      setType(pokemonType)

      pkmName.innerText='#'+pokemonSpriteId+' '+pokemonName
      pkmJapName.innerText=pokemonNameJap+' | R$ '+dollarValue.replace(/(\d).(?=\d)/g, '$1,')
      pkmSpriteHolder.src =pokemonSprite

      dollarSpan.innerText='R$ '+dollarValue.replace(/(\d).(?=\d)/g, '$1,')



}

// Gotta Catch 'Em All!

catchPokemon()

