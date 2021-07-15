import React from 'react'
import Pokemon from './Pokemon'
import Spinner from 'react-bootstrap/Spinner'


const PokeGrid =(props)=>{

    const{pokemons, submit}=props


    return(
        <div className='poke-grid'>
                {pokemons ? pokemons.map((poke, index)=>{
                    
                    let n = poke.url.split('pokemon/')[1].split('/')[0]
                    
                    
                    return(
                        <Pokemon number={n} key={index} poke={poke} submit={submit} />
                    )
                }) : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </div>
    )
}

export default PokeGrid