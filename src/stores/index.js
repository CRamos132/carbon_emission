import { createStore, combineReducers } from 'redux'

function dataReducer(state = {data: []}, action) {
    switch(action.type){
        case 'UPDATE_DATA':
            return {...state, data: action.data}
        default:
            return state
    }
}

function urlReducer(state = {url: 'https://api.carbonintensity.org.uk/intensity/stats/2018-01-20T12:00Z/2018-01-29T12:30Z/24'}, action) {
    switch(action.type){
        case 'UPDATE_URL':
            return {...state, url: action.url}
        default:
            return state
    }
}
function searchDateReducer(state = {date_init: '', date_end: '', block: 24}, action){
    switch(action.type){
        case 'SET_DATE_INIT':
            return {...state, date_init: action.date_init}
        case 'SET_DATE_END':
            return {...state, date_end: action.date_end}
        case 'SET_BLOCK':
            return {...state, block: action.block}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    dataReducer,
    urlReducer,
    searchDateReducer
})

const storeSaved = createStore(rootReducer)

export default storeSaved