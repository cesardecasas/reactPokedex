import {SEARCH_VALUE, POKEMONS, INF} from '../types'
import {getPokes, getPoke} from '../../services/service'

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