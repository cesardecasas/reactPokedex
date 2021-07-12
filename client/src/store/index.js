import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'


const store = createStore(combineReducers({
        state:reducer
}), applyMiddleware(thunk))

export default store