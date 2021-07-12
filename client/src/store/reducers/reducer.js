import {SEARCH_VALUE, POKEMONS} from '../types'

const initialState = {
    search:'',
    limit:10,
    page:0,
    pokemons:[]
}

const Reducer=( state =initialState, action)=>{
    switch(action.type){
        case SEARCH_VALUE:
            return{...state, [action.payload.name]: action.payload.value}
        case POKEMONS:
            return{...state,pokemons:action.payload.results}
        default:
            return { ...state }
    }
}

export default Reducer