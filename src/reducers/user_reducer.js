import axios from 'axios';

// Initial State
const initialState = {
    id: 0,
    role: 'placeholder',
    user_name: "placeholder",
    first_name: "placeholder",
    last_name: "placeholder",
    email: "placeholder@gmail.com",
    img: "placeholder"
}
// Actions Consts
const GET_USER = 'GET_USER';
const GET_INFO = 'GET_INFO'

// Action Builders
export function getUser() {
    // anytime you do an axios call  to set state, use middleware + '_FULFILLED' on the reducer
    const user = axios.get('/auth/me').then(res => {
        return res.data
    })
    return {
        type: GET_USER,
        payload: user
    }
}
export function getInfo() {
    return {
        type: GET_INFO,
        payload: 'getInfo'
    }
}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, action.payload)
        case GET_INFO:
            return Object.assign({}, state, { getinfo: action.payload })
        default:
            return state;
    }
}