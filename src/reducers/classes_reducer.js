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
        console.log('response: ', res)
        console.log('response: ', res.data)
        return res.data
    })
    return {
        type: ADD_ASSIGNMENT,
        payload: payload
    }
}
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
    //let classes = [];
    let classes = axios.get('/api/teacher/' + id).then(res => {
        console.log('hit reducer get classes')

        // make new arrays from data and set them to state.
        // create a new list of classes
        let newClasses = []
        for (let i in res.data) {
            if (!newClasses.some(x => x.class_id === res.data[i].class_id)) {
                newClasses.push({
                    class_id: res.data[i].class_id,
                    class_name: res.data[i].class_name,
                    students: [],
                    assignments: []
                })
            }
        }
        // Assigning each student to their corresponding classes.
        for (let j in newClasses) {
            for (let i in res.data) {
                if (newClasses[j].class_id === res.data[i].class_id) {
                    if (!newClasses[j].students.some(x => x.student_id === res.data[i].student_id)) {
                        newClasses[j].students.push({
                            student_id: res.data[i].student_id,
                            first_name: res.data[i].student_first_name,
                            last_name: res.data[i].student_last_name,
                            marks: []
                        })
                    }
                }
            }
        }
        // Assign assignments to corresponding classes
        for (let j in newClasses) {
            for (let i in res.data) {
                if (newClasses[j].class_id === res.data[i].class_id) {
                    if (!newClasses[j].assignments.some(x => x.id === res.data[i].assignment_id)) {
                        newClasses[j].assignments.push({
                            id: res.data[i].assignment_id,
                            desc: res.data[i].assignment_desc,
                            max: res.data[i].assignment_max,
                            kind: res.data[i].assignment_kind,
                            dateDue: res.data[i].assignment_due_date
                        })
                    }
                }
            }
        }
        for (let i in newClasses) {
            for (let j in newClasses[i].students) {
                for (let k in res.data) {
                    if (res.data[k].class_id === newClasses[i].class_id &&
                        res.data[k].student_id === newClasses[i].students[j].student_id &&
                        res.data[k].mark_student_id === newClasses[i].students[j].student_id
                    ) {
                        newClasses[i].students[j].marks.push({
                            student_id: res.data[k].mark_student_id,
                            id: res.data[k].mark_id,
                            score: res.data[k].mark_score,
                            score_max: res.data[k].assignment_max,
                            assignment_id: res.data[k].assignment_id,
                            kind: res.data[k].assignment_kind
                        })
                    }
                }
            }
        }
        return newClasses;
        //return res.data.slice(0,10)

    })
    return {
        type: GET_CLASSES,
        payload: classes
    }

}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES + '_FULFILLED':
            return Object.assign({}, state, { list: action.payload });
        case ADD_ASSIGNMENT + '_FULFILLED':
            console.log('state: ', state)
            let newState = Object.assign({}, state)
            for (let i in newState.list) {
                if (newState.list[i].class_id === action.payload[0].class_id) {
                    // console.log('LEFT OFF HERE!!!', newState.list[i])
                    newState.list[i].assignments = action.payload
                        //.filter(x => x.kind === 'test')
                        .map(x => {
                            return {
                                dateDue: x.due_date,
                                desc: x.description,
                                id: x.id,
                                kind: x.kind,
                                max: x.max_score
                            }
                        })
                }
            }
            return newState;
        default:
            return state;
    }
}