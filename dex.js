
const sortInput = document.querySelector('#sort-input')
const searchInput = document.querySelector('#search-input')

let PokeDex = []


// better fetch

// fetches raw data from api returning in an array
const getData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=649")
    const data = await response.json()
    // console.log(data)
    const dataArr = data.results
    // console.log(dataArr);
    return (dataArr)
}

// Search
searchInput.addEventListener('input', (event) => {
    const inputSearch = event.target.value
    console.log(inputSearch);

    if (Number(inputSearch)) {
        // Search IDs
        const filteredPokeDexID = PokeDex.filter((pokemon) => {
            result = (pokemon.id == inputSearch)
            return result
        })

        
        // Logging for debugging
        console.log("Filtered Pokemon:", filteredPokeDexID.id);
        
        addPokeToDOM(filteredPokeDexID)

    } else {
        // Search names
        const filteredPokeDex = PokeDex.filter((pokemon) => {
            //result = pokemon.name.includes(inputSearch)
            result = pokemon.name.startsWith(inputSearch)
            return result
        })

        addPokeToDOM(filteredPokeDex)
        console.table(filteredPokeDex.name)
    }

})


// Sort
sortInput.addEventListener('change', (event) => {
    const sortBy = event.target.value
    console.log(sortBy);

    switch (sortBy) {
        case 'id-asc':
            PokeDex.sort((pokeA, pokeB) => pokeA.id - pokeB.id)
            break
        case 'id-des':
            PokeDex.sort((pokeA, pokeB) => pokeB.id - pokeA.id)
            break
        case 'name-des':
            PokeDex.sort((pokeA, pokeB) => {
                if (pokeA.name > pokeB.name) return -1
                if (pokeA.name < pokeB.name) return 1
                
                return 0
            })
            break
        case 'name-asc':
            PokeDex.sort((pokeA, pokeB) => {
                if (pokeA.name < pokeB.name) return -1
                if (pokeA.name > pokeB.name) return 1
                
                return 0
            })
        // case 'type':
        //         const inputSearch = searchInput.value
        //         // console.log(inputSearch);

        //         getTypes(PokeDex, inputSearch)
                
        //     break
    }

    addPokeToDOM(PokeDex)
})

// // sort by type function
// function getTypes(PokeDex, inputSearch) {
//     const filteredPokeDex = PokeDex.filter((pokemon) => {
//         return pokemon.types.type.name.includes(inputSearch)
//     })
// }

// calls raw data from api in array
getData()
    .then(dexArray => {
        //console.log(dexArray);
        return getDetailedData(dexArray)
    })
    .then((dP) => {
        PokeDex = dP
        addPokeToDOM(dP)    
    })

async function getDetailedData(dexArray) {
    const detailedPD = dexArray.map(async (pokemon) => {
        const pokeData = await fetch(pokemon.url)
        const pokeD = await pokeData.json()
        return pokeD
    })
    
    const detailedData = Promise.all(detailedPD)
    return detailedData 
    
    // for in
    // for (const poke of dexArray) {
    //     const pokeData = await fetch(poke.url)
    //     const pokeD = await pokeData.json()
    //     detailedPD.push(pokeD)
    //     // console.log(pokeD);
    // }

    //console.log(detailedPD);
    
}

// // IIFE (imediately invoked function expression)
// ;(async () => {
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

// function for adding poke data to cards
async function addPokeToDOM(dP) {
    let cardElements = ''
    const cardContainer = document.getElementById('poke-cards')
        for (const dPD of dP) {
            pokeTypes = dPD.types
        // console.log(pokeTypes);
        
        typeList = ''
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
            <img src="${dPD.sprites.other.dream_world.front_default}" alt="${dPD.name}">
            <h5>${dPD.name}</h5>
            <span>ID: ${dPD.id}</span>
            <div class="types">
                ${typeList}
            </div>
        </article>`

    }
    cardContainer.innerHTML = cardElements

}


