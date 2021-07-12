import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/reducer'

const store = createStore(combineReducers({
        state:reducer
}), composeWithDevTools())

export default store