import axios from 'axios';

// Initial State
const initialState = [{
    assignments: [],
    name: 'placeholder',
    students: []
}]
// Actions Consts
const GET_CLASSES = 'GET_CLASSES'

// Action Builders
export function getClasses(id) {
    /* example object returned
    {
        "teacher_id": 16,
        "class_id": 2,
        "class_name": "Math 1020",
        "student_id": 57,
        "student_first_name": "Dudly",
        "student_last_name": "Duderton",
        "assignment_id": 4,
        "assignment_max": 100,
        "assignment_desc": "Math Worksheet",
        "assignment_kind": "assignment",
        "assignment_due_date": "10/20/2015",
        "mark_id": 2,
        "mark_score": 20,
        "mark_student_id": 11
    },
     */
    let classes = [];
    classes = axios.get('/api/teacher/' + id).then(res => {
        console.log('hit reducer getclasses')
        return res.data.slice(0,20)
    })
    // make new arrays from data and set them to state.
    // for(let i in classes){

    // }
    //classes = 
    // let top5 = classes.slice(0, 5)
    //classes= classes.slice(0,5)
    return {
        type: GET_CLASSES,
        payload: classes
    }
}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES + '_FULFILLED':
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}