import axios from 'axios';

// Initial State
const initialState = {
    list: []
}
// Actions Consts
const GET_CLASSES = 'GET_CLASSES'
const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'

// Action Builders
export function addAssignment(body) {
    let payload = axios.post('/api/add/assignment', body).then(res => {

        return res.data
    })
    return {
        type: ADD_ASSIGNMENT,
        payload: payload
    }
}
export function getClasses(id) {
    return {
        type: GET_CLASSES,
        payload: 'classes'
    }

}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES + '_FULFILLED':
            return state;
        case ADD_ASSIGNMENT + '_FULFILLED':
            return state;
        default:
            return state;
    }
}