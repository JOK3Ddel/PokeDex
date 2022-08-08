/*
    TO-DO:
    - Search function for names, types and id  || use .filter
    - Sort function for a-z, z-a, and numerically high to low, low to high  || use .sort
*/

// better fetch

// fetches raw data from api returning in an array
const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const data = await response.json()
    // console.log(data)
    const dataArr = data.results
    // console.log(dataArr);
    return (dataArr)
}

// Search
let inputSearch = ''
document.getElementById("input-search").addEventListener('change', (event) => {
    inputSearch = event.target.value
    /* to-do
    - call function that makes global array containing names that contain input value
    - pass new data array to addPokeToDOM

    - same for id and types
     */
    // compare input to database/api

})

// calls raw data from api in array
getData().then(dexArray => {
    //console.log(dexArray);
    addPokeToDOM(dexArray)
})



// function for adding poke data to cards
async function addPokeToDOM(dataArr) {
    let cardElements = ''
    const cardContainer = document.getElementById('poke-cards')

    // for in
    for (const poke of dataArr) {
        const pokeData = await fetch(poke.url)
        const pokeD = await pokeData.json()
        // console.log(pokeD);

        typeList = ''
        pokeTypes = pokeD.types
        // console.log(pokeTypes);
        pokeTypesArr = pokeTypes.map(pokeType => pokeType.type.name)
        pokeTypesArr.forEach(pokeType => {
            switch (pokeType) {
                case 'grass':
                    typeList += ' <span class="pill background-color-grass"> Grass </span> '
                    break
                case 'bug':
                    typeList += ' <span class="pill background-color-bug"> Bug </span> '
                    break
                case 'dragon':
                    typeList += ' <span class="pill background-color-dragon"> Dragon </span> '
                    break
                case 'electric':
                    typeList += ' <span class="pill background-color-electric"> Electric </span> '
                    break
                case 'fighting':
                    typeList += ' <span class="pill background-color-fighting"> Fighting </span> '
                    break
                case 'fire':
                    typeList += ' <span class="pill background-color-fire"> Fire </span> '
                    break
                case 'flying':
                    typeList += ' <span class="pill background-color-flying"> Flying </span> '
                    break
                case 'ghost':
                    typeList += ' <span class="pill background-color-ghost"> Ghost </span> '
                    break
                case 'ground':
                    typeList += ' <span class="pill background-color-ground"> Ground </span> '
                    break
                case 'ice':
                    typeList += ' <span class="pill background-color-ice"> Ice </span> '
                    break
                case 'normal':
                    typeList += ' <span class="pill background-color-normal"> Normal </span> '
                    break
                case 'poison':
                    typeList += ' <span class="pill background-color-poison"> Poison </span> '
                    break
                case 'psychic':
                    typeList += ' <span class="pill background-color-psychic"> Psychic </span> '
                    break
                case 'rock':
                    typeList += ' <span class="pill background-color-rock"> Rock </span> '
                    break
                case 'water':
                    typeList += ' <span class="pill background-color-water"> Water </span> '
                    break
            }
        })

        cardElements += `
        <article class="card">
            <img src="${pokeD.sprites.other.dream_world.front_default}" alt="${pokeD.name}">
            <h5>${pokeD.name}</h5>
            <span>ID: ${pokeD.id}</span>
            <div class="types">
                ${typeList}
            </div>
        </article>`

    }
    cardContainer.innerHTML = cardElements
}


// // IIFE (imediately invoked function expression)
// (async () => {
//     const indexData = await getData()

//     console.log(indexData);
// })()

// // Promise
//  const pokemonPromiseArr = pokemonindex.map(async (pokemon) => {
//     const response = await fetch(pokemon.url)
//     const data = await response.json()
//     return data

//     const pokemonArr = Promise.all(pokemonPromiseArr)

//     return pokemonArr
//  })