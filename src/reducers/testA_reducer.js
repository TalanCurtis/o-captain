// Initial State
const initialState = {
    testA: '',
    testState: 0
}
// Actions Consts
const TEST_A_ACTION = 'TEST_A_ACTION'

// Action Builders
export function testAction() {
    return {
        type: TEST_A_ACTION,
        payload: 1
    }
}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_A_ACTION:
            return Object.assign({}, state, { testState: state.testState + action.payload })
        default:
            return state;
    }
}