import React,{useEffect, useState} from 'react'
import {Collapse} from 'react-bootstrap'
import PokeInf from './PokeInf'
import {getPoke} from '../services/service'
import Spinner from 'react-bootstrap/Spinner'




const Pokemon =(props)=>{
    const{number, saveCache, pokeCache}=props
    
    const [open, setOpen] = useState(false)
    const [pokemon, setPokemon]= useState({})

    const getInf =async()=>{
        try {
            if(`${number}` in pokeCache){
                setPokemon(pokeCache[`${number}`])
            }else{
                let inf = await getPoke(number)
                setPokemon(inf)
                saveCache(number, inf)
            } 
        } catch (error) {
            console.log(error)
        }
    }

    const drop =()=>{
        setOpen(!open)
    }

    useEffect(()=>{
        getInf()
    },[number])


    return(
        <div className='poke' onClick={drop}>
            {pokemon.sprites ? <div>
                <img src={pokemon.sprites.front_default} alt='pokemon'/>
            <p>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)} #{number}</p>
            <Collapse in={open} >
                <div>
                    <PokeInf  inf={pokemon} />
                </div>
            </Collapse>
            </div>
                
            :
            <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
        }
            
        </div>
    )
}

export default Pokemon