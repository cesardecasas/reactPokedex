import {SEARCH_VALUE, POKEMONS, INF, TYPE} from '../types'

const initialState = {
    search:'',
    limit:12,
    page:1,
    pokemons:[],
    pokemon:false,
    inf:{},
    type:false,
    nType:"",
    pokeType:[],

}

const Reducer=( state =initialState, action)=>{
    
    switch(action.type){
        case SEARCH_VALUE:
            return{...state, [action.payload.name]: action.payload.value}
        case POKEMONS:
            return{...state,pokemons:action.payload.results}
        case INF:
            return{...state,inf:action.payload, pokemon:true}
        case TYPE:
            return{...state,pokeType:action.payload}
        default:
            return { ...state }
    }
}

export default Reducer