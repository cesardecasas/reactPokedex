import {SEARCH_VALUE, POKEMONS} from '../types'
import {getPokes} from '../../services/service'

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