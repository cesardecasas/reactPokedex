import {SEARCH_VALUE, POKEMONS, INF, TYPE} from '../types'
import {getPokes, getPoke, getPokeType} from '../../services/service'

export const search=(name,value)=>({
    type:SEARCH_VALUE,
    payload: {
        name,
        value
      }
})

export const getPokemon =(limit,page)=>async(dispatch)=>{
  try {
      const pokemon = await getPokes(limit,page)
      dispatch({
          type:POKEMONS,
          payload:pokemon
      })
      
  } catch (error) {
      return error 
  }
} 

export const getInf =(n)=>async(dispatch)=>{
    try {
        const pokemon = await getPoke(n)
        console.log(pokemon)
        dispatch({
            type:INF,
            payload:pokemon
        })
        
    } catch (error) {
        return error 
    }
  } 

  export const getPokeTy =(n)=>async(dispatch)=>{
    try {
        const pokemon = await getPokeType(n)
        console.log(pokemon.pokemon)
        dispatch({
            type:TYPE,
            payload:pokemon.pokemon
        })
        
    } catch (error) {
        return error 
    }
  } 