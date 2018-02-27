// Initial State
const initialState = {
    testB: '',
    testState: 0
}
// Actions Consts
const TEST_B_ACTION = 'TEST_B_ACTION'

// Action Builders
export function testAction() {
    return {
        type: TEST_B_ACTION,
        payload: 1
    }
}

// Reducer
export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_B_ACTION:
            return Object.assign({}, state, { testState: state.testState + action.payload })
        default:
            return state;
    }
}