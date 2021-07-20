import {SEARCH_VALUE, POKEMONS, INF, TYPE, CACHE} from '../types'

const initialState = {
    search:'',
    limit:12,
    page:1,
    pokemons:[],
    typeSearch:[],
    habitatSearch:[],
    abilitySearch:[],
    inf:{},
    pokeCache:{},
    searchType:'Name',
    render:[],
    orderBy:'Pokedex #'
}

const Reducer=( state =initialState, action)=>{
    console.log(action)
    switch(action.type){
        case SEARCH_VALUE:
            return{...state, [action.payload.name]: action.payload.value}
        case POKEMONS:
            return{...state,pokemons:action.payload.results}
        case INF:
            return{...state,inf:action.payload, pokemon:true}
        case TYPE:
            return{...state,pokeType:action.payload}
        case CACHE:
            return{...state, pokeCache: { ...state.pokeCache, [action.payload.num]:action.payload.obj}}
        default:
            return { ...state }
    }
}

export default Reducer