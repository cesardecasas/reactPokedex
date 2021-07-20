import React from 'react'
import Pokemon from './Pokemon'
import Spinner from 'react-bootstrap/Spinner'


const PokeGrid =(props)=>{

    const{pokemons, saveCache, pokeCache}=props


    return(
        <div className='poke-grid'>
                {pokemons ? pokemons.map((poke, index)=>{

                    let n
                    
                    poke.pokemon ? n = poke.pokemon.url.split('pokemon/')[1].split('/')[0] : poke.url.includes('species') ? n = poke.url.split('species/')[1].split('/')[0] : n = poke.url.split('pokemon/')[1].split('/')[0]
                    
                    return(
                        <Pokemon number={n} key={index} poke={poke} saveCache={saveCache} pokeCache={pokeCache} />
                    )
                }) : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </div>
    )
}

export default PokeGrid