import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducers/reducer'
import thunk from 'redux-thunk'


const store = createStore(combineReducers({
        state:reducer
}), composeWithDevTools(applyMiddleware(thunk)))

export default store