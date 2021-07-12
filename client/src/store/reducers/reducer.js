import {SEARCH_VALUE} from '../types'

const initialState = {
    search:'',
    limit:10,
    page:0
}

const Reducer=( state =initialState, action)=>{
    switch(action.type){
        case SEARCH_VALUE:
            return{...state, [action.payload.name]: action.payload.value}
        default:
            return { ...state }
    }
}

export default Reducer