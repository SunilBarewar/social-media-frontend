import{
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from "redux";

import thunk from "redux-thunk"
import { reducers } from "../reducers";

// advantage of usint this method is you will never loose data because it stored in localstorage 
function saveToLocalStorage(store){
    try {
        const serializedStore = JSON.stringify(store)
        window.localStorage.setItem('store',serializedStore);

    } catch (error) {
        console.log(error)
    }
}

function loadFromLocalStorage(){
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null)return undefined;
        return JSON.parse(serializedStore)
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const persistedState = loadFromLocalStorage();
// persisted means whenever you will refresh the page the  your state will not lose, they will be in your localstorage
const store = createStore(reducers,persistedState,composeEnhancers(applyMiddleware(thunk)))

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;