import {SEARCH_VALUE, POKEMONS, INF} from '../types'

const initialState = {
    search:'',
    limit:10,
    page:0,
    pokemons:[],
    pokemon:false,
    inf:{}
}

const Reducer=( state =initialState, action)=>{
    switch(action.type){
        case SEARCH_VALUE:
            return{...state, [action.payload.name]: action.payload.value}
        case POKEMONS:
            return{...state,pokemons:action.payload.results}
        case INF:
            return{...state,inf:action.payload, pokemon:true}
        default:
            return { ...state }
    }
}

export default Reducer