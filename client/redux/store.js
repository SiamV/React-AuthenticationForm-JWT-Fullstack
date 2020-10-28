import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import loginReducer from "./reducers/loginReducer";


let reducersStack = combineReducers({
    login: loginReducer,
})

let store = createStore(reducersStack, applyMiddleware(thunkMiddleware));

export default store;