import {SEARCH_VALUE, POKEMONS} from '../types'
import {getPokes} from '../../services/service'

export const search=(name,value)=>({
    type:SEARCH_VALUE,
    payload: {
        name,
        value
      }
})

export const getRandom =()=>async(dispatch)=>{
  try {
      const products = await getPokes()
      dispatch({
          type:POKEMONS,
          payload:products
      })
      
  } catch (error) {
      return error 
  }
} 