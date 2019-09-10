const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_SINGLE_CATEGORY':
            // debugger 
            return action.category

        
        default:
            return state
    }
}