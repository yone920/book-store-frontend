const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_SINGLE_PRODUCT':
            // debugger 
            return action.product

        
        default:
            return state
    }
}